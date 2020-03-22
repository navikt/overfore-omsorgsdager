import {
    createFieldValidationError
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { Utenlandsopphold } from 'common/forms/utenlandsopphold/types';
import {
    date1YearAgo, date1YearFromNow, dateRangesCollide, dateRangesExceedsRange
} from 'common/utils/dateUtils';
import { FieldValidationResult } from 'common/validation/types';
import { Arbeidssituasjon } from '../types/SøknadFormData';
import { fødselsnummerIsValid, FødselsnummerValidationErrorReason } from './fødselsnummerValidator';

export enum AppFieldValidationErrors {
    'påkrevd' = 'fieldvalidation.påkrevd',
    'fødselsnummer_11siffer' = 'fieldvalidation.fødselsnummer.11siffer',
    'fødselsnummer_ugyldig' = 'fieldvalidation.fødselsnummer.ugyldig',
    'utenlandsopphold_ikke_registrert' = 'fieldvalidation.utenlandsopphold_ikke_registrert',
    'utenlandsopphold_overlapper' = 'fieldvalidation.utenlandsopphold_overlapper',
    'utenlandsopphold_utenfor_periode' = 'fieldvalidation.utenlandsopphold_utenfor_periode'
}

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

const fieldIsRequiredError = () => createAppFieldValidationError(AppFieldValidationErrors.påkrevd);

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

// export const validateYesOrNoIsAnswered = (answer: YesOrNo): FieldValidationResult => {
//     if (answer === YesOrNo.UNANSWERED || answer === undefined) {
//         return fieldIsRequiredError();
//     }
//     return undefined;
// };

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

// export const validateRequiredField = (value: any): FieldValidationResult => {
//     if (!hasValue(value)) {
//         return fieldIsRequiredError();
//     }
//     return undefined;
// };

export const validateArbeid = (value: Arbeidssituasjon[]): FieldValidationResult => {
    if (value === undefined || value.length === 0) {
        return fieldIsRequiredError();
    }
    return undefined;
};

// export const fieldValidationError = (
//     key: AppFieldValidationErrors | undefined,
//     values?: any
// ): FieldValidationResult => {
//     return key
//         ? {
//               key,
//               values
//           }
//         : undefined;
// };
