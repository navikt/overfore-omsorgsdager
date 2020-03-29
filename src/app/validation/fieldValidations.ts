import {
    createFieldValidationError
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FormikValidateFunction } from '@navikt/sif-common-formik/lib';
import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import {
    date1YearAgo, date1YearFromNow, dateRangesCollide, dateRangesExceedsRange
} from 'common/utils/dateUtils';
import { FieldValidationResult } from 'common/validation/types';
import { Arbeidssituasjon } from '../types/ApplicationFormData';
import { fødselsnummerIsValid, FødselsnummerValidationErrorReason } from './fødselsnummerValidator';

export enum AppFieldValidationErrors {
    'påkrevd' = 'fieldvalidation.påkrevd',
    'fødselsnummer_11siffer' = 'fieldvalidation.fødselsnummer.11siffer',
    'fødselsnummer_ugyldig' = 'fieldvalidation.fødselsnummer.ugyldig',
    'utenlandsopphold_ikke_registrert' = 'fieldvalidation.utenlandsopphold_ikke_registrert',
    'utenlandsopphold_overlapper' = 'fieldvalidation.utenlandsopphold_overlapper',
    'utenlandsopphold_utenfor_periode' = 'fieldvalidation.utenlandsopphold_utenfor_periode',
    'dager_er_ikke_tall' = 'fieldvalidation.dager_er_ikke_tall',
    'dager_feil_antall' = 'fieldvalidation.dager_feil_antall',
    'fnr_lik_applicantFnr' = 'fieldvalidation.fnr_lik_applicantFnr'
}

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export type FieldValidationArray = (validations: FormikValidateFunction[]) => (value: any) => FieldValidationResult;

const fieldIsRequiredError = () => createAppFieldValidationError(AppFieldValidationErrors.påkrevd);

export const validateAll: FieldValidationArray = (validations: FormikValidateFunction[]) => (
    value: any
): FieldValidationResult => {
    let result: FieldValidationResult;
    validations.some((validate) => {
        const r = validate(value);
        if (r) {
            result = r;
            return true;
        }
        return false;
    });
    return result;
};

export const createAppFieldValidationError = (
    error: AppFieldValidationErrors | AppFieldValidationErrors,
    values?: any
): FieldValidationResult => {
    return createFieldValidationError<AppFieldValidationErrors | AppFieldValidationErrors>(error, values);
};

export const validateFødselsnummer = (v: string): FieldValidationResult => {
    const [isValid, reasons] = fødselsnummerIsValid(v);
    if (!isValid) {
        if (reasons.includes(FødselsnummerValidationErrorReason.MustConsistOf11Digits)) {
            return createAppFieldValidationError(AppFieldValidationErrors.fødselsnummer_11siffer);
        } else {
            return createAppFieldValidationError(AppFieldValidationErrors.fødselsnummer_ugyldig);
        }
    }
};

export const validateUtenlandsoppholdSiste12Mnd = (utenlandsopphold: Utenlandsopphold[]): FieldValidationResult => {
    if (utenlandsopphold.length === 0) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_ikke_registrert);
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_overlapper);
    }
    if (dateRangesExceedsRange(dateRanges, { from: date1YearAgo, to: new Date() })) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_utenfor_periode);
    }

    return undefined;
};

export const validateUtenlandsoppholdNeste12Mnd = (utenlandsopphold: Utenlandsopphold[]): FieldValidationResult => {
    if (utenlandsopphold.length === 0) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_ikke_registrert);
    }
    const dateRanges = utenlandsopphold.map((u) => ({ from: u.fom, to: u.tom }));
    if (dateRangesCollide(dateRanges)) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_overlapper);
    }
    if (dateRangesExceedsRange(dateRanges, { from: new Date(), to: date1YearFromNow })) {
        return createAppFieldValidationError(AppFieldValidationErrors.utenlandsopphold_utenfor_periode);
    }
    return undefined;
};

export const validateArbeid = (value: Arbeidssituasjon[]): FieldValidationResult => {
    if (value === undefined || value.length === 0) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateNumericValue = ({ min, max }: { min?: number; max?: number }) => (
    value: any
): FieldValidationResult => {
    const num = parseFloat(value);
    if (isNaN(num)) {
        return createFieldValidationError(AppFieldValidationErrors.dager_er_ikke_tall);
    }
    if ((min !== undefined && num < min) || (max !== undefined && value > max)) {
        return createFieldValidationError(AppFieldValidationErrors.dager_feil_antall);
    }
    return undefined;
};

export const validateFødselsnummerIsDifferentThan = (applicantFnr: string) => (fnr: string) => {
    if (hasValue(fnr) && applicantFnr === fnr.trim()) {
        return createFieldValidationError(AppFieldValidationErrors.fnr_lik_applicantFnr);
    }
    return undefined;
};
