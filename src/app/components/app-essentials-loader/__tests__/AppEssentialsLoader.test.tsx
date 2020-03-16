import { cleanup, render, waitForElement } from '@testing-library/react';
import * as React from 'react';
import IntlProvider from 'app/components/intl-provider/IntlProvider';
import AppEssentialsLoader from '../AppEssentialsLoader';

jest.mock('./../../../utils/envUtils', () => {
    return {
        getEnvironmentVariable: () => 'someEnvVar'
    };
});

jest.mock('./../../../utils/featureToggleUtils', () => {
    return {
        isFeatureEnabled: () => false,
        Feature: {}
    };
});

jest.mock('./../../../api/api', () => {
    return {
        getSøker: jest.fn().mockResolvedValue('søkerdata')
    };
});

jest.mock('./../../../utils/apiUtils', () => {
    return {
        isForbidden: jest.fn(() => false),
        isUnauthorized: jest.fn(() => false)
    };
});

const renderWrappedInMockIntlProvider = (child: React.ReactNode) =>
    render(
        <IntlProvider locale="nb" onError={() => null}>
            {child}
        </IntlProvider>
    );

describe('<AppEssentialsLoader />', () => {
    beforeEach(() => {
        window.scroll = jest.fn();
        window.location.assign = jest.fn();
    });

    it('should show user a loading spinner initially', () => {
        const { getByTestId } = renderWrappedInMockIntlProvider(
            <AppEssentialsLoader contentLoadedRenderer={() => null} />
        );
        expect(getByTestId('spinner-element')).toBeTruthy();
    });

    it('should replace the loading spinner with contentRenderer() return value when getSøker has resolved', async () => {
        const stringContent = 'Some string content';
        const contentRenderer = () => <p>{stringContent}</p>;
        const { getByText, queryByTestId } = renderWrappedInMockIntlProvider(
            <AppEssentialsLoader contentLoadedRenderer={contentRenderer} />
        );
        expect(queryByTestId('spinner-element')).toBeTruthy();
        await waitForElement(() => getByText(stringContent));
        expect(getByText(stringContent)).toBeTruthy();
        expect(queryByTestId('spinner-element')).toBeNull();
    });

    afterAll(cleanup);
});
