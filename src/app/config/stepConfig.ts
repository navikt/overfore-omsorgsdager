import { getSøknadRoute } from '../utils/routeUtils';
import routeConfig from './routeConfig';

export enum StepID {
    'OVERFØRING' = 'overføring',
    'MEDLEMSKAP' = 'medlemskap',
    'ARBEID' = 'arbeid',
    'SUMMARY' = 'oppsummering'
}

export interface StepConfigItemTexts {
    pageTitle: string;
    stepTitle: string;
    stepIndicatorLabel: string;
    nextButtonLabel?: string;
    nextButtonAriaLabel?: string;
}
export interface StepItemConfigInterface extends StepConfigItemTexts {
    index: number;
    nextStep?: StepID;
    backLinkHref?: string;
}

export interface StepConfigInterface {
    [key: string]: StepItemConfigInterface;
}

const getStepConfigItemTextKeys = (stepId: StepID): StepConfigItemTexts => {
    return {
        pageTitle: `step.${stepId}.pageTitle`,
        stepTitle: `step.${stepId}.stepTitle`,
        stepIndicatorLabel: `step.${stepId}.stepIndicatorLabel`,
        nextButtonLabel: 'step.nextButtonLabel',
        nextButtonAriaLabel: 'step.nextButtonAriaLabel'
    };
};

export const getStepConfig = (): StepConfigInterface => {
    let idx = 0;
    const config = {
        [StepID.OVERFØRING]: {
            ...getStepConfigItemTextKeys(StepID.OVERFØRING),
            index: idx++,
            nextStep: StepID.ARBEID,
            backLinkHref: routeConfig.WELCOMING_PAGE_ROUTE
        },
        [StepID.ARBEID]: {
            ...getStepConfigItemTextKeys(StepID.ARBEID),
            index: idx++,
            nextStep: StepID.MEDLEMSKAP,
            backLinkHref: getSøknadRoute(StepID.OVERFØRING)
        },
        [StepID.MEDLEMSKAP]: {
            ...getStepConfigItemTextKeys(StepID.MEDLEMSKAP),
            index: idx++,
            nextStep: StepID.SUMMARY,
            backLinkHref: getSøknadRoute(StepID.ARBEID)
        }
    };

    config[StepID.SUMMARY] = {
        ...getStepConfigItemTextKeys(StepID.SUMMARY),
        index: idx++,
        backLinkHref: getSøknadRoute(StepID.MEDLEMSKAP),
        nextButtonLabel: 'step.sendButtonLabel',
        nextButtonAriaLabel: 'step.sendButtonAriaLabel'
    };

    return config;
};

export interface StepConfigProps {
    onValidSubmit: () => void;
}

export const stepConfig: StepConfigInterface = getStepConfig();
