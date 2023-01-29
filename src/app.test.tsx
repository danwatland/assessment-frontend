import '@testing-library/jest-dom';
import * as React from 'react';
import * as PageService from './services/PageService';
import * as ReactRouter from 'react-router';
import { fireEvent, render } from '@testing-library/react';
import App from './app';

jest.mock('react-router');
jest.mock('./services/PageService');

describe('app', () => {
    const mockRouter = ReactRouter as jest.Mocked<typeof ReactRouter>;
    const mockPageService = PageService as jest.Mocked<typeof PageService>;

    describe('page one', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-one' });
            mockPageService.getPageData.mockResolvedValue({
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
            });
            mockPageService.getWeatherForecast.mockResolvedValue({
                    lon: '40.748607102729295',
                    lat: '-73.98563758004718',
                    condition: 'cloudy',
                    conditionName: 'Cloudy',
                    temperature: 78,
                    unit: 'f',
                    location: 'New York, NY',
                    upcomming: [
                        {
                            day: 'Fri',
                            condition: 'cloudy',
                            conditionName: 'Cloudy',
                        },
                        {
                            day: 'Sat',
                            condition: 'cloudy',
                            conditionName: 'Cloudy',
                        },
                        {
                            day: 'Sun',
                            condition: 'rain',
                            conditionName: 'Rain',
                        },
                    ],
                }
            );
        });

        it('should show an image of the New York skyline and a weather report', async () => {
            const rendered = render(<App />);

            expect(await rendered.findByAltText('Cartoon of New York skyline')).toBeInTheDocument();
            expect(await rendered.getByText('New York, NY')).toBeInTheDocument();
            expect(await rendered.getByText(/78/)).toBeInTheDocument();
        });
    });

    describe('page two', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-two' });
            mockPageService.getPageData.mockResolvedValue({
                variables: [
                    {
                        name: 'show_weather',
                        type: 'string',
                        initialValue: 'hide',
                    },
                ],
                lists: [
                    {
                        id: 0,
                        components: [1, 2, 3]
                    },
                    {
                        id: 1,
                        components: [4]
                    }
                ],
                components: [
                    {
                        id: 1,
                        type: 'button',
                        options: {
                            text: 'Show',
                            variable: 'show_weather',
                            value: 'show',
                        },
                    },
                    {
                        id: 2,
                        type: 'button',
                        options: {
                            text: 'Hide',
                            variable: 'show_weather',
                            value: 'hide',
                        },
                    },
                    {
                        id: 3,
                        type: 'condition',
                        options: {
                            variable: 'show_weather',
                            value: 'show',
                        },
                        children: 1,
                    },
                    {
                        id: 4,
                        type: 'weather',
                        options: {
                            lon: '37.82012350797623',
                            lat: '-122.47822291578807',
                        }
                    },
                ],
            });
            mockPageService.getWeatherForecast.mockResolvedValue({
                    lon: '37.82012350797623',
                    lat: '-122.47822291578807',
                    condition: 'clear-day',
                    conditionName: 'Clear',
                    temperature: 75,
                    unit: 'f',
                    location: 'San Francisco, CA',
                    upcomming: [
                        {
                            day: 'Fri',
                            condition: 'cloudy',
                            conditionName: 'Cloudy',
                        },
                        {
                            day: 'Sat',
                            condition: 'clear-day',
                            conditionName: 'Clear',
                        },
                        {
                            day: 'Sun',
                            condition: 'rain',
                            conditionName: 'Rain',
                        },
                    ],
                }
            );
        });

        it('should display a show button, a hide button and a weather forecast', async () => {
            const rendered = render(<App />);

            expect(await rendered.findByText('Show')).toBeInTheDocument();
            expect(await rendered.findByText('Hide')).toBeInTheDocument();
        });

        it('should show the forecast when the show button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('Show')
            fireEvent.click(rendered.getByText('Show'));

            expect(await rendered.findByText('San Francisco, CA')).toBeInTheDocument();
        });

        it('should hide the forecast when the forecast is shown and the hide button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('Show')
            fireEvent.click(rendered.getByText('Show'));

            await rendered.findByText('San Francisco, CA');

            fireEvent.click(rendered.getByText('Hide'))

            expect(rendered.queryByText('San Francisco, CA')).not.toBeInTheDocument();
        });
    });
});
