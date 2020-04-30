import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { StepConfigInterface, StepConfigItemTexts, StepID } from 'app/config/stepConfig';
import { ApplicationFormData } from '../types/ApplicationFormData';
import {
    medlemskapStepIsValid, opplysningerOmOverføringIsValid, situasjonStepIsValid,
    welcomingPageIsValid
} from '../validation/stepValidations';

export const getStepTexts = (intl: IntlShape, stepId: StepID, stepConfig: StepConfigInterface): StepConfigItemTexts => {
    const conf = stepConfig[stepId];
    return {
        pageTitle: intlHelper(intl, conf.pageTitle),
        stepTitle: intlHelper(intl, conf.stepTitle),
        stepIndicatorLabel: intlHelper(intl, conf.stepIndicatorLabel),
        nextButtonLabel: conf.nextButtonLabel ? intlHelper(intl, conf.nextButtonLabel) : undefined,
        nextButtonAriaLabel: conf.nextButtonAriaLabel ? intlHelper(intl, conf.nextButtonAriaLabel) : undefined
    };
};

export const situasjonStepIsAvailable = (formData: ApplicationFormData) => {
    return welcomingPageIsValid(formData);
};

export const overføringStepIsAvailable = (formData: ApplicationFormData) => {
    return situasjonStepIsValid(formData);
};

export const medlemskapStepAvailable = (formData: ApplicationFormData) => {
    return opplysningerOmOverføringIsValid(formData);
};

export const summaryStepAvailable = (formData: ApplicationFormData) => {
    return medlemskapStepIsValid(formData);
};
