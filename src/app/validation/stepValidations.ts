import { YesOrNo } from 'common/types/YesOrNo';
import { SøknadFormData } from '../types/SøknadFormData';

export const welcomingPageIsValid = ({
    harForståttRettigheterOgPlikter,
    kroniskEllerFunksjonshemming
}: SøknadFormData) => kroniskEllerFunksjonshemming === YesOrNo.YES && harForståttRettigheterOgPlikter === true;

export const opplysningerOmOverføringIsValid = (values: SøknadFormData) => values !== undefined; // TODO

export const arbeidStepIsValid = ({ arbeidssituasjon }: SøknadFormData) =>
    arbeidssituasjon !== undefined && arbeidssituasjon.length > 0;

export const medlemskapStepIsValid = ({
    harBoddUtenforNorgeSiste12Mnd,
    skalBoUtenforNorgeNeste12Mnd
}: SøknadFormData) =>
    (harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES || harBoddUtenforNorgeSiste12Mnd === YesOrNo.NO) &&
    (skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES || skalBoUtenforNorgeNeste12Mnd === YesOrNo.NO);
