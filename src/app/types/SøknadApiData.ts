import { ApiStringDate } from 'common/types/ApiStringDate';
import { Locale } from 'common/types/Locale';
import { Arbeidssituasjon } from './SøknadFormData';

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
    fornavn: string;
    etternavn: string;
}

export interface SøknadApiData {
    språk: Locale;
    arbeidssituasjon: Arbeidssituasjon[];
    fnrMottaker: string;
    fosterbarn?: FosterbarnApi[];
    antallDager: number;
    medlemskap: MedlemskapApiData;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
