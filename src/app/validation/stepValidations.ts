import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { ApplicationFormData } from '../types/ApplicationFormData';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter }: ApplicationFormData) => {
    return harForståttRettigheterOgPlikter === true;
};

export const opplysningerOmOverføringIsValid = (values: ApplicationFormData) => {
    return values !== undefined; // TODO
};

export const arbeidStepIsValid = ({ harForståttRettigheterOgPlikter, arbeidssituasjon }: ApplicationFormData) => {
    const harValgtArbeidsSituasjon = arbeidssituasjon !== undefined && arbeidssituasjon.length > 0;
    return harForståttRettigheterOgPlikter && harValgtArbeidsSituasjon;
};

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd
}: ApplicationFormData) =>
    (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES || harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO) &&
    (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES || skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO);
