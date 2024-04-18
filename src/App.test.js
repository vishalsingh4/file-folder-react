import { render, cleanup } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
    afterEach(cleanup);

    it('should render App component', () => {
        const { asFragment, getByTestId } = render(<App />);
        const files = getByTestId('files');
        expect(files).toBeInTheDocument();
    })
})