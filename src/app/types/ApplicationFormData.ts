import { Fosterbarn } from 'common/forms/fosterbarn/types';
import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import { YesOrNo } from 'common/types/YesOrNo';

export enum Arbeidssituasjon {
    'arbeidstaker' = 'arbeidstaker',
    'selvstendigNæringsdrivende' = 'selvstendigNæringsdrivende',
    'frilanser' = 'frilanser'
}

export enum ApplicationFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    harFosterbarn = 'harFosterbarn',
    fosterbarn = 'fosterbarn',
    fnrMottaker = 'fnrMottaker',
    antallDager = 'antallDager',
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
    arbeidssituasjon = 'arbeidssituasjon',
    erYrkesaktiv = 'erYrkesaktiv'
}

export interface ApplicationFormData {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: boolean;
    [ApplicationFormField.harBekreftetOpplysninger]: boolean;
    [ApplicationFormField.harFosterbarn]: YesOrNo;
    [ApplicationFormField.fosterbarn]: Fosterbarn[];
    [ApplicationFormField.fnrMottaker]: string;
    [ApplicationFormField.antallDager]: number;
    [ApplicationFormField.arbeidssituasjon]: Arbeidssituasjon[];
    [ApplicationFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [ApplicationFormField.utenlandsoppholdSiste12Mnd]: Utenlandsopphold[];
    [ApplicationFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [ApplicationFormField.utenlandsoppholdNeste12Mnd]: Utenlandsopphold[];
}

export const initialApplicationValues: Partial<ApplicationFormData> = {
    [ApplicationFormField.harForståttRettigheterOgPlikter]: false,
    [ApplicationFormField.harBekreftetOpplysninger]: false,
    [ApplicationFormField.fnrMottaker]: '',
    [ApplicationFormField.arbeidssituasjon]: [],
    [ApplicationFormField.harFosterbarn]: YesOrNo.UNANSWERED,
    [ApplicationFormField.fosterbarn]: [],
    [ApplicationFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [ApplicationFormField.utenlandsoppholdSiste12Mnd]: [],
    [ApplicationFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [ApplicationFormField.utenlandsoppholdNeste12Mnd]: []
};
