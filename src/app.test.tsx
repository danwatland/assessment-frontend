import * as React from 'react';
import axios from 'axios';
import * as ReactRouter from 'react-router';
import { render, RenderResult, waitFor } from '@testing-library/react';
import App from './app';

jest.mock('react-router');
jest.mock('axios');

describe('app', () => {
    const mockRouter = ReactRouter as jest.Mocked<typeof ReactRouter>;
    const mockAxios = axios as jest.Mocked<typeof axios>;
    let rendered: RenderResult;

    describe('when ID url parameter is 1', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-one' });
            mockAxios.get.mockResolvedValue({ data: { data: {
                lists: [{ id: 0, components: [1, 2]}],
                components: [{
                    "id": 1,
                    "type": "image",
                    "options": {
                        "src": "/locations/new-york.png",
                        "alt": "Cartoon of New York skyline"
                    }
                }, {
                    "id": 2,
                    "type": "weather",
                    "options": {
                        "lon": "40.748607102729295",
                        "lat": "-73.98563758004718"
                    }
                }]
            }}});

            rendered = render(<App />);
        });

        it('should show an image of the New York skyline and a weather report', async () => {
            expect(await rendered.findByAltText('Cartoon of New York skyline')).toBeDefined();
            expect(rendered.getByText('New York, NY')).toBeDefined();
            expect(rendered.getByText('78 (℉)')).toBeDefined();
        });
    });
});
