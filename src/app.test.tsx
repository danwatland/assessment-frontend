import * as React from 'react';
import * as ReactRouter from 'react-router';
import App from './app';
import { render, RenderResult } from '@testing-library/react';

jest.mock('react-router');

describe('app', () => {
    const mockRouter = ReactRouter as jest.Mocked<typeof ReactRouter>;
    let rendered: RenderResult;

    describe('when ID url parameter is 1', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: '1' });

            rendered = render(<App />);
        });

        it('should show an image of the New York skyline and a weather report', async () => {
            expect(await rendered.findByAltText('Cartoon of New York skyline')).toBeInTheDocument();
            expect(rendered.getByText('New York, NY')).toBeInTheDocument();
            expect(rendered.getByText('78 (℉)')).toBeInTheDocument();
        });
    });
});
