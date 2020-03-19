import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { StepConfigInterface, StepConfigItemTexts, StepID } from 'app/config/stepConfig';
import { SøknadFormData } from '../types/SøknadFormData';
import {
    arbeidStepIsValid, medlemskapStepIsValid, opplysningerOmOverføringIsValid, welcomingPageIsValid
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

/*
export const overføringStepIsAvailable = (formData: SøknadFormData) => welcomingPageIsValid(formData);

export const arbeidStepIsAvailable = (formData: SøknadFormData) => opplysningerOmOverføringIsValid(formData);

export const medlemskapStepAvailable = (formData: SøknadFormData) => arbeidStepIsValid(formData);

export const summaryStepAvailable = (formData: SøknadFormData) => medlemskapStepIsValid(formData);
*/

export const arbeidStepIsAvailable = (formData: SøknadFormData) =>  {
    return welcomingPageIsValid(formData);
};

export const overføringStepIsAvailable = (formData: SøknadFormData) => {
    return arbeidStepIsValid(formData);
};

export const medlemskapStepAvailable = (formData: SøknadFormData) => {
    return opplysningerOmOverføringIsValid(formData);
};

export const summaryStepAvailable = (formData: SøknadFormData) => {
    return medlemskapStepIsValid(formData)
};