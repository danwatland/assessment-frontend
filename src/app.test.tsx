import '@testing-library/jest-dom';
import * as React from 'react';
import * as PageService from './services/PageService';
import * as ReactRouter from 'react-router';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import VALUES from '../server/values';
import PAGES from '../server/pages';
import App from './app';
import { usePageStore } from './state/PageStore';

jest.mock('react-router');
jest.mock('./services/PageService');

describe('app', () => {
    const mockRouter = ReactRouter as jest.Mocked<typeof ReactRouter>;
    const mockPageService = PageService as jest.Mocked<typeof PageService>;

    beforeEach(() => {
        usePageStore.setState({ forecast: undefined });
    });

    describe('page one', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-one' });
            mockPageService.getPageData.mockResolvedValue(PAGES[0].data);
            mockPageService.getWeatherForecast.mockResolvedValue(VALUES.WEATHER_LOCATIONS[0]);
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
            mockPageService.getPageData.mockResolvedValue(PAGES[1].data);
            mockPageService.getWeatherForecast.mockResolvedValue(VALUES.WEATHER_LOCATIONS[1]);
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

    describe('page three', () => {
        beforeEach(() => {
            mockRouter.useParams.mockReturnValue({ id: 'page-three' });
            mockPageService.getPageData.mockResolvedValue(PAGES[2].data);
            mockPageService.getWeatherForecast.mockResolvedValue(VALUES.WEATHER_LOCATIONS[0]);
        });

        it('should display buttons and the forecast for New York', async () => {
            const rendered = render(<App />);

            await rendered.findByText('New York, NY');
            expect(rendered.getByText('Show')).toBeInTheDocument();
            expect(rendered.getByText('San Francisco')).toBeInTheDocument();
            expect(rendered.getByText('Chicago')).toBeInTheDocument();
            expect(rendered.getByText('New York, NY')).toBeInTheDocument();
            expect(rendered.getByText(/78/)).toBeInTheDocument();
        });

        it('should show a picture of the New York skyline when the show button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('Show');
            fireEvent.click(rendered.getByText('Show'));

            expect(await rendered.findByAltText('Cartoon of New York skyline')).toBeInTheDocument();
        });

        it('should hide the picture of the skyline when already shown and hide button is pressed', async () => {
            const rendered = render(<App />);

            await rendered.findByText('Show');
            fireEvent.click(rendered.getByText('Show'));
            await rendered.findByAltText('Cartoon of New York skyline');
            fireEvent.click(rendered.getByText('Hide'));

            expect(rendered.queryByAltText('Cartoon of New York skyline')).not.toBeInTheDocument();
        });

        describe('when San Francisco button is pressed', () => {
            beforeEach(() => {
                mockPageService.getWeatherForecast.mockResolvedValueOnce(VALUES.WEATHER_LOCATIONS[0]);
            });

            it('should show a forecast for San Francisco', async () => {
                const rendered = render(<App />);

                await rendered.findByText('San Francisco');
                mockPageService.getWeatherForecast.mockResolvedValue(VALUES.WEATHER_LOCATIONS[1]);
                fireEvent.click(rendered.getByText('San Francisco'));

                expect(await rendered.findByText('San Francisco, CA')).toBeInTheDocument();
            });

            it('should show a picture of the San Francisco skyline when the show button is pressed', async () => {
                const rendered = render(<App />);

                await rendered.findByText('Show');
                mockPageService.getWeatherForecast.mockResolvedValueOnce(VALUES.WEATHER_LOCATIONS[1]);
                fireEvent.click(rendered.getByText('Show'));
                fireEvent.click(rendered.getByText('San Francisco'));

                expect(await rendered.findByAltText('Cartoon of San Francisco skyline')).toBeInTheDocument();
            });
        });

        describe('when Chicago button is pressed', () => {
            beforeEach(() => {
                mockPageService.getWeatherForecast.mockResolvedValueOnce(VALUES.WEATHER_LOCATIONS[0]);
            });

            it('should show a forecast for Chicago', async () => {
                const rendered = render(<App />);

                await rendered.findByText('Chicago');
                mockPageService.getWeatherForecast.mockResolvedValueOnce(VALUES.WEATHER_LOCATIONS[2]);
                fireEvent.click(rendered.getByText('Chicago'));

                expect(await rendered.findByText('Chicago, IL')).toBeInTheDocument();
            });

            it('should show a picture of the Chicago skyline when the show button is pressed', async () => {
                const rendered = render(<App />);

                await rendered.findByText('Show');
                mockPageService.getWeatherForecast.mockResolvedValueOnce(VALUES.WEATHER_LOCATIONS[2]);
                fireEvent.click(rendered.getByText('Show'));
                fireEvent.click(rendered.getByText('Chicago'));

                expect(await rendered.findByAltText('Cartoon of Chicago skyline')).toBeInTheDocument();
            });
        });
    });
});
