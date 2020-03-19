import { YesOrNo } from 'common/types/YesOrNo';
import { SøknadFormData } from '../types/SøknadFormData';

export const welcomingPageIsValid = ({ harForståttRettigheterOgPlikter, harSamfunnskritiskJobb }: SøknadFormData) => {
    return harSamfunnskritiskJobb === YesOrNo.YES && harForståttRettigheterOgPlikter === true;
};


export const opplysningerOmOverføringIsValid = (values: SøknadFormData) => {
    return  values !== undefined; // TODO
};

export const arbeidStepIsValid = ({ harForståttRettigheterOgPlikter, arbeidssituasjon }: SøknadFormData) => {
    const harValgtArbeidsSituasjon = (arbeidssituasjon !== undefined && arbeidssituasjon.length > 0);
    return harForståttRettigheterOgPlikter && harValgtArbeidsSituasjon;
};

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd
}: SøknadFormData) =>
    (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES || harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO) &&
    (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES || skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO);
