import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { ApplicationFormData, Stengingsperiode } from '../types/ApplicationFormData';
import { hasValue, isValidFnr, yesOrNoIsAnswered } from './fieldValidations';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: ApplicationFormData) => {
    return harForståttRettigheterOgPlikter === true;
};

export const situasjonStepIsValid = ({
    harForståttRettigheterOgPlikter,
    arbeidssituasjon,
    harFosterbarn,
    fosterbarn,
}: ApplicationFormData) => {
    const harValgtArbeidsSituasjon = arbeidssituasjon !== undefined && arbeidssituasjon.length > 0;
    const harValidFosterbarn = harFosterbarn === YesOrNo.NO || fosterbarn.length > 0;
    return harForståttRettigheterOgPlikter && harValgtArbeidsSituasjon && harValidFosterbarn;
};

export const mottakerStepIsValid = ({ fnrMottaker, navnMottaker, erYrkesaktiv }: ApplicationFormData) => {
    return hasValue(fnrMottaker) && hasValue(navnMottaker) && erYrkesaktiv === YesOrNo.YES && isValidFnr(fnrMottaker);
};

export const overføringStepIsValid = ({ antallDager, stengingsperiode }: ApplicationFormData) => {
    return (
        hasValue(antallDager) &&
        (stengingsperiode === Stengingsperiode.etterAugust9 || stengingsperiode === Stengingsperiode.mars13tilJuni30)
    );
};

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd,
}: ApplicationFormData) =>
    yesOrNoIsAnswered(harBoddUtenforNorgeSiste12Mnd) && yesOrNoIsAnswered(skalBoUtenforNorgeNeste12Mnd);
