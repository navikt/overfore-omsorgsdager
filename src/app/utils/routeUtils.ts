import RouteConfig from '../config/routeConfig';
import { getStepConfig, StepID } from '../config/stepConfig';
import { SøknadFormData, SøknadFormField } from '../types/SøknadFormData';
import { welcomingPageIsValid } from '../validation/stepValidations';
import { appIsRunningInDevEnvironment } from './envUtils';
import { arbeidStepIsAvailable, medlemskapStepAvailable, summaryStepAvailable } from './stepUtils';

export const getSøknadRoute = (stepId: StepID | undefined) => {
    if (stepId !== undefined) {
        return `${RouteConfig.SØKNAD_ROUTE_PREFIX}/${stepId}`;
    }
    return undefined;
};

export const getNextStepRoute = (stepId: StepID, formData?: SøknadFormData): string | undefined => {
    const stepConfig = getStepConfig();
    return stepConfig[stepId] ? getSøknadRoute(stepConfig[stepId].nextStep) : undefined;
};

export const isAvailable = (path: StepID | RouteConfig, values: SøknadFormData) => {
    if (!appIsRunningInDevEnvironment()) {
        switch (path) {
            case StepID.OVERFØRING:
                return welcomingPageIsValid(values);
            case StepID.ARBEID:
                return arbeidStepIsAvailable(values);
            case StepID.MEDLEMSKAP:
                return medlemskapStepAvailable(values);
            case StepID.SUMMARY:
                return summaryStepAvailable(values);
            case RouteConfig.SØKNAD_SENDT_ROUTE:
                return values[SøknadFormField.harBekreftetOpplysninger];
        }
    }
    return true;
};
