import RouteConfig from '../config/routeConfig';
import { getStepConfig, StepID } from '../config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { welcomingPageIsValid } from '../validation/stepValidations';
import { appIsRunningInDevEnvironment } from './envUtils';
import { arbeidStepIsAvailable, medlemskapStepAvailable, summaryStepAvailable } from './stepUtils';

export const getApplicationRoute = (stepId: StepID | undefined) => {
    if (stepId !== undefined) {
        return `${RouteConfig.APPLICATION_ROUTE_PREFIX}/${stepId}`;
    }
    return undefined;
};

export const getNextStepRoute = (stepId: StepID, formData?: ApplicationFormData): string | undefined => {
    const stepConfig = getStepConfig();
    return stepConfig[stepId] ? getApplicationRoute(stepConfig[stepId].nextStep) : undefined;
};

export const isAvailable = (
    path: StepID | RouteConfig,
    values: ApplicationFormData,
    applicationHasBeenSent?: boolean
) => {
    if (!appIsRunningInDevEnvironment()) {
        switch (path) {
            case StepID.ARBEID:
                return welcomingPageIsValid(values);
            case StepID.OVERFØRING:
                return arbeidStepIsAvailable(values);
            case StepID.MEDLEMSKAP:
                return medlemskapStepAvailable(values);
            case StepID.SUMMARY:
                return summaryStepAvailable(values);
            case RouteConfig.APPLICATION_SENDT_ROUTE:
                return applicationHasBeenSent;
        }
    }
    return true;
};
