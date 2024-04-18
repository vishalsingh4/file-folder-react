import { render, cleanup, fireEvent } from '@testing-library/react';

import File from './index';

describe('<File />', () => {
    afterEach(cleanup);

    it('should match snapshot', () => {
        const { asFragment } = render(<File />);
        expect(asFragment).toMatchSnapshot();
    });

    it('should render File component', () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        expect(files).toBeInTheDocument();
        expect(files.children).toHaveLength(6);
        expect(files.children[0].children[0]).toHaveTextContent("node_modules");
        expect(files.children[1].children[0]).toHaveTextContent("public");
        expect(files.children[1].children[0].children[1]).toHaveTextContent("[+]");
        expect(files.children[2].children[0]).toHaveTextContent("src");
        expect(files.children[2].children[0].children[1]).toHaveTextContent("[-]");
        expect(files.children[3].placeholder).toEqual("Please enter file name");
        expect(files.children[4].children[0]).toHaveTextContent("App.js");
        expect(files.children[4].children[1]).toHaveTextContent("components");
        expect(files.children[4].children[1].children[0].children[1]).toHaveTextContent("[+]");
        expect(files.children[5].children[0]).toHaveTextContent("Git");
        expect(files.children[5].children[0].children[1]).toHaveTextContent("[+]");
    });

    it('should do nothing on clicking the item if it has no sub files/folders', () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        const firstNodeEle = files.children[0].children[0];

        expect(firstNodeEle).toHaveTextContent("node_modules");
        fireEvent.click(firstNodeEle);
        expect(firstNodeEle.children.length).toEqual(1);
    });

    it('should toggle the expansion of a file on clicking + or - sign of item', () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        const secondNodeEle = files.children[1].children[0];
        const toggleIconOnSecondNodeEle = secondNodeEle.children[1];

        expect(secondNodeEle).toHaveTextContent("public");
        expect(toggleIconOnSecondNodeEle).toHaveTextContent("[+]");
        fireEvent.click(toggleIconOnSecondNodeEle);
        expect(toggleIconOnSecondNodeEle).toHaveTextContent("[-]");
    });

    it('should add a new file to ./src directory', () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        const thirdNodeEle = files.children[2].children[0];
        const toggleIconOnThirdNodeEle = thirdNodeEle.children[1];
        const inputEle = files.children[3];
        const fileName_mock = 'test.js';

        expect(thirdNodeEle).toHaveTextContent("src");
        expect(toggleIconOnThirdNodeEle).toHaveTextContent("[-]");
        fireEvent.change(inputEle, {target: {value: fileName_mock}});

        expect(inputEle.value).toEqual(fileName_mock);
    });

    it("should display an alert on clicking + button if input box is empty", () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        const inputEle = files.children[3];

        const alertMock = jest.spyOn(window, "alert").mockImplementation();
        fireEvent.change(inputEle, {target: {value: ""}});
        fireEvent.keyDown(inputEle, {target: {value: ""}, key: 'Enter',code: 'Enter',charCode: 13});

        expect(alertMock).toHaveBeenCalledWith( "Please enter a file name in the input box");
    });

    it('should make an item a folder on double clicking it', () => {
        const { getByTestId } = render(<File />);
        const files = getByTestId('files');
        const appjsFileEle = files.children[4].children[0];

        expect(appjsFileEle).toHaveTextContent("App.js");

        fireEvent.doubleClick(appjsFileEle);

        expect(appjsFileEle).toHaveTextContent("App");
    })
})