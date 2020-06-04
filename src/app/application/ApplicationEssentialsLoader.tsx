import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getApplicantData } from '../api/api';
import LoadWrapper from '../components/load-wrapper/LoadWrapper';
import { ApplicantDataContextProvider } from '../context/ApplicantDataContext';
import { ApplicantData } from '../types/ApplicantData';
import * as apiUtils from '../utils/apiUtils';
import {
    navigateToErrorPage,
    navigateToLoginPage,
    navigateToWelcomePage,
    userIsCurrentlyOnErrorPage,
} from '../utils/navigationUtils';
import appSentryLogger from '../utils/appSentryLogger';

interface Props {
    contentLoadedRenderer: (søkerdata?: ApplicantData) => React.ReactNode;
}

interface LoadState {
    isLoading: boolean;
    error?: boolean;
}

const ApplicationEssentialsLoader = ({ contentLoadedRenderer }: Props) => {
    const [loadState, setLoadState] = useState<LoadState>({ isLoading: true });
    const [applicantData, setApplicantData] = useState<ApplicantData | undefined>();
    const history = useHistory();

    async function loadApplicationEssentials() {
        if (applicantData === undefined && loadState.error === undefined) {
            try {
                const { data: person } = await getApplicantData();
                setApplicantData({ person });
                setLoadState({ isLoading: false, error: undefined });
                if (userIsCurrentlyOnErrorPage()) {
                    navigateToWelcomePage();
                }
            } catch (error) {
                if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                    navigateToLoginPage();
                } else if (!userIsCurrentlyOnErrorPage()) {
                    appSentryLogger.logApiError(error);
                    navigateToErrorPage(history);
                }

                // this timeout is set because if isLoading is updated in the state too soon,
                // the contentLoadedRenderer() will be called while the user is still on the wrong route,
                // because the redirect to routeConfig.ERROR_PAGE_ROUTE will not have happened yet.
                setTimeout(() => setLoadState({ isLoading: false, error: true }), 200);
            }
        }
    }

    useEffect(() => {
        loadApplicationEssentials();
    }, [applicantData, loadState]);

    const { isLoading, error } = loadState;

    return (
        <LoadWrapper
            isLoading={isLoading && error === undefined}
            contentRenderer={() => (
                <ApplicantDataContextProvider value={applicantData}>
                    {contentLoadedRenderer(applicantData)}
                </ApplicantDataContextProvider>
            )}
        />
    );
};

export default ApplicationEssentialsLoader;
