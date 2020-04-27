import { getCountryName } from '@navikt/sif-common-formik/lib';
import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import { Locale } from 'common/types/Locale';
import { YesOrNo } from 'common/types/YesOrNo';
import { formatDateToApiFormat } from 'common/utils/dateUtils';
import { ApplicationApiData, UtenlandsoppholdApiData } from '../types/ApplicationApiData';
import { ApplicationFormData } from '../types/ApplicationFormData';

export const mapFormDataToApiData = (
    {
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter,
        harBoddUtenforNorgeSiste12Mnd,
        arbeidssituasjon,
        harFosterbarn,
        fosterbarn,
        antallDager,
        fnrMottaker,
        navnMottaker,
        erYrkesaktiv,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
        utenlandsoppholdSiste12Mnd
    }: ApplicationFormData,
    sprak: Locale
): ApplicationApiData => {
    const apiData: ApplicationApiData = {
        språk: (sprak as any) === 'en' ? 'nn' : sprak,
        arbeidssituasjon,
        fnrMottaker,
        navnMottaker,
        mottakerErYrkesaktiv: erYrkesaktiv === YesOrNo.YES,
        antallDager,
        medlemskap: {
            harBoddIUtlandetSiste12Mnd: harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES,
            skalBoIUtlandetNeste12Mnd: skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES,
            utenlandsoppholdSiste12Mnd:
                harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES
                    ? utenlandsoppholdSiste12Mnd.map((o) => mapUtenlandsoppholdTilApiData(o, sprak))
                    : [],
            utenlandsoppholdNeste12Mnd:
                skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES
                    ? utenlandsoppholdNeste12Mnd.map((o) => mapUtenlandsoppholdTilApiData(o, sprak))
                    : []
        },
        harBekreftetOpplysninger,
        harForståttRettigheterOgPlikter
    };

    if (harFosterbarn === YesOrNo.YES && fosterbarn.length > 0) {
        apiData.fosterbarn = fosterbarn.map((barn) => {
            const { fødselsnummer } = barn;
            return { fødselsnummer };
        });
    }
    return apiData;
};

const mapUtenlandsoppholdTilApiData = (opphold: Utenlandsopphold, locale: string): UtenlandsoppholdApiData => ({
    landnavn: getCountryName(opphold.landkode, locale),
    landkode: opphold.landkode,
    fraOgMed: formatDateToApiFormat(opphold.fom),
    tilOgMed: formatDateToApiFormat(opphold.tom)
});
