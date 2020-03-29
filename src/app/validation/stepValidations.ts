import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { ApplicationFormData } from '../types/ApplicationFormData';
import { hasValue, isValidFnr } from './fieldValidations';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: ApplicationFormData) => {
    return harForståttRettigheterOgPlikter === true;
};

export const situasjonStepIsValid = ({
    harForståttRettigheterOgPlikter,
    arbeidssituasjon,
    harFosterbarn,
    fosterbarn
}: ApplicationFormData) => {
    const harValgtArbeidsSituasjon = arbeidssituasjon !== undefined && arbeidssituasjon.length > 0;
    const harValidFosterbarn = harFosterbarn === YesOrNo.NO || fosterbarn.length > 0;
    return harForståttRettigheterOgPlikter && harValgtArbeidsSituasjon && harValidFosterbarn;
};

export const opplysningerOmOverføringIsValid = ({ fnrMottaker, antallDager }: ApplicationFormData) => {
    return hasValue(fnrMottaker) && hasValue(antallDager) && isValidFnr(fnrMottaker);
};

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd
}: ApplicationFormData) =>
    (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES || harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO) &&
    (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES || skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO);
