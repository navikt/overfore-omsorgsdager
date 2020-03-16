import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import { YesOrNo } from 'common/types/YesOrNo';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser'
}

export enum SøknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
    arbeidssituasjon = 'arbeidssituasjon',
    erYrkesaktiv = 'erYrkesaktiv',
    kroniskEllerFunksjonshemming = 'kroniskEllerFunksjonshemming'
}

export interface SøknadFormData {
    [SøknadFormField.erYrkesaktiv]: YesOrNo;
    [SøknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SøknadFormField.harBekreftetOpplysninger]: boolean;
    [SøknadFormField.kroniskEllerFunksjonshemming]: YesOrNo;
    [SøknadFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [SøknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [SøknadFormField.utenlandsoppholdSiste12Mnd]: Utenlandsopphold[];
    [SøknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [SøknadFormField.utenlandsoppholdNeste12Mnd]: Utenlandsopphold[];
}

export const initialValues: SøknadFormData = {
    [SøknadFormField.erYrkesaktiv]: YesOrNo.YES,
    [SøknadFormField.kroniskEllerFunksjonshemming]: YesOrNo.UNANSWERED,
    [SøknadFormField.harForståttRettigheterOgPlikter]: false,
    [SøknadFormField.harBekreftetOpplysninger]: false,
    [SøknadFormField.arbeidssituasjon]: [],
    [SøknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandsoppholdSiste12Mnd]: [],
    [SøknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandsoppholdNeste12Mnd]: []
};
