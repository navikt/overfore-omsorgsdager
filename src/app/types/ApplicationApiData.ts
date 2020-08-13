import { ApiStringDate } from 'common/types/ApiStringDate';
import { Locale } from 'common/types/Locale';
import { Arbeidssituasjon, Stengingsperiode } from './ApplicationFormData';

export type ISO8601Duration = string;

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdApiData[];
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdApiData[];
}

export interface UtenlandsoppholdApiData {
    fraOgMed: ApiStringDate;
    tilOgMed: ApiStringDate;
    landkode: string;
    landnavn: string;
}

export interface FosterbarnApi {
    fødselsnummer: string;
}

export interface ApplicationApiData {
    språk: Locale;
    arbeidssituasjon: Arbeidssituasjon[];
    fnrMottaker: string;
    erYrkesaktiv: boolean;
    navnMottaker: string;
    fosterbarn?: FosterbarnApi[];
    antallDager: number;
    stengingsperiode: Stengingsperiode;
    medlemskap: MedlemskapApiData;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
