import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { ApplicationFormData, ApplicationFormField } from '../types/ApplicationFormData';

/**
 * Lager typed nav-frontend-skjema komponenter med formik
 * @navikt/sif-common-formik
 */
const ApplicationFormComponents = getTypedFormComponents<ApplicationFormField, ApplicationFormData>();

export default ApplicationFormComponents;
