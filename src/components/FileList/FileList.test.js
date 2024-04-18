import { render, cleanup } from '@testing-library/react';

import FileList from './index';

describe('<FileList />', () => {
    afterEach(cleanup);

    it('should match snapshot', () => {
        const { asFragment } = render(<FileList />);
        expect(asFragment).toMatchSnapshot();
    });
})