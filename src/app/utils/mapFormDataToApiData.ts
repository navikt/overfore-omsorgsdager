import { getCountryName } from '@navikt/sif-common-formik/lib';
import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import { Locale } from 'common/types/Locale';
import { YesOrNo } from 'common/types/YesOrNo';
import { formatDateToApiFormat } from 'common/utils/dateUtils';
import { SøknadApiData, UtenlandsoppholdApiData } from '../types/SøknadApiData';
import { SøknadFormData } from '../types/SøknadFormData';

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
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
        utenlandsoppholdSiste12Mnd
    }: SøknadFormData,
    sprak: Locale
): SøknadApiData => {
    const apiData: SøknadApiData = {
        språk: (sprak as any) === 'en' ? 'nn' : sprak,
        arbeidssituasjon,
        fnrMottaker,
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
            const { id, ...rest } = barn;
            return rest;
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
