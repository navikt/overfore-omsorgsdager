import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useFormikContext } from 'formik';
import ConfirmationPage from '../components/pages/confirmation-page/ConfirmationPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import WelcomingPage from '../components/pages/welcoming-page/WelcomingPage';
import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { StepID } from '../config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { navigateTo } from '../utils/navigationUtils';
import { getApplicationRoute, getNextStepRoute, isAvailable } from '../utils/routeUtils';
import MedlemsskapStep from './medlemskap-step/MedlemsskapStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import OverføringStep from './overføring-step/OverføringStep';
import SituasjonStep from './situasjon-step/SituasjonStep';
import MottakerStep from './mottaker-step/MottakerStep';

export interface KvitteringInfo {
    søkernavn: string;
}

const ApplicationRoutes: React.FunctionComponent = () => {
    const { values } = useFormikContext<ApplicationFormData>();

    const history = useHistory();

    const navigateToNextStepFrom = (stepId: StepID) => {
        setTimeout(() => {
            const nextStepRoute = getNextStepRoute(stepId);
            if (nextStepRoute) {
                navigateTo(nextStepRoute, history);
            }
        });
    };

    return (
        <Switch>
            <Route
                path={RouteConfig.WELCOMING_PAGE_ROUTE}
                render={() => (
                    <WelcomingPage
                        onValidSubmit={() =>
                            setTimeout(() => {
                                navigateTo(`${RouteConfig.APPLICATION_ROUTE_PREFIX}/${StepID.SITUASJON}`, history);
                            })
                        }
                    />
                )}
            />

            {isAvailable(StepID.SITUASJON, values) && (
                <Route
                    path={getApplicationRoute(StepID.SITUASJON)}
                    render={() => <SituasjonStep onValidSubmit={() => navigateToNextStepFrom(StepID.SITUASJON)} />}
                />
            )}
            {isAvailable(StepID.MOTTAKER, values) && (
                <Route
                    path={getApplicationRoute(StepID.MOTTAKER)}
                    render={() => <MottakerStep onValidSubmit={() => navigateToNextStepFrom(StepID.MOTTAKER)} />}
                />
            )}
            {isAvailable(StepID.OVERFØRING, values) && (
                <Route
                    path={getApplicationRoute(StepID.OVERFØRING)}
                    render={() => <OverføringStep onValidSubmit={() => navigateToNextStepFrom(StepID.OVERFØRING)} />}
                />
            )}
            {isAvailable(StepID.MEDLEMSKAP, values) && (
                <Route
                    path={getApplicationRoute(StepID.MEDLEMSKAP)}
                    render={() => <MedlemsskapStep onValidSubmit={() => navigateToNextStepFrom(StepID.MEDLEMSKAP)} />}
                />
            )}

            {isAvailable(StepID.SUMMARY, values) && (
                <Route
                    path={getApplicationRoute(StepID.SUMMARY)}
                    render={() => (
                        <OppsummeringStep
                            onApplicationSent={() => {
                                window.location.href = getRouteUrl(RouteConfig.APPLICATION_SENDT_ROUTE); // Ensures history is lost
                            }}
                        />
                    )}
                />
            )}

            <Route path={RouteConfig.APPLICATION_SENDT_ROUTE} render={() => <ConfirmationPage />} />

            <Route path={RouteConfig.ERROR_PAGE_ROUTE} component={GeneralErrorPage} />

            <Redirect to={RouteConfig.WELCOMING_PAGE_ROUTE} />
        </Switch>
    );
};

export default ApplicationRoutes;
