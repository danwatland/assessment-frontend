import '@testing-library/jest-dom';
import * as React from 'react';
import axios from 'axios';
import * as ReactRouter from 'react-router';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import App from './app';

jest.mock('react-router');
jest.mock('axios');

describe('app', () => {
    const mockRouter = ReactRouter as jest.Mocked<typeof ReactRouter>;
    const mockAxios = axios as jest.Mocked<typeof axios>;

    describe('page one', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-one' });
            mockAxios.get.mockResolvedValueOnce({ data: { data: {
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
            mockAxios.get.mockResolvedValueOnce({ data: { data:
                {
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
            }});
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
            mockAxios.get.mockResolvedValueOnce({ data: { data: {
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
            }}});
            mockAxios.get.mockResolvedValueOnce({ data: { data: {
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
            }});
        });

        it('should display a show button, a hide button and a weather forecast', async () => {
            const rendered = render(<App />);

            expect(await rendered.findByText('Show')).toBeInTheDocument();
            expect(await rendered.findByText('Hide')).toBeInTheDocument();
            expect(await rendered.findByText('San Francisco, CA')).toBeInTheDocument();
        });

        it('should hide the forecast when the hide button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('San Francisco, CA');
            fireEvent.click(rendered.getByText('Hide'));

            expect(rendered.queryByText('San Francisco, CA')).not.toBeInTheDocument();
        });

        it('should show the forecast when the forecast is hidden and the show button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('San Francisco, CA');
            fireEvent.click(rendered.getByText('Hide'));

            await waitForElementToBeRemoved(rendered.queryByText('San Francisco, CA'));

            fireEvent.click(rendered.getByText('Show'))

            expect(rendered.queryByText('San Francisco, CA')).toBeInTheDocument();
        });
    });
});
