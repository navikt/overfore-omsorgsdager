import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { SøknadFormData, SøknadFormField } from '../../../types/SøknadFormData';

/**
 * Lager typed nav-frontend-skjema komponenter med formik
 * @navikt/sif-common-formik
 */
const TypedFormComponents = getTypedFormComponents<SøknadFormField, SøknadFormData>();

export default TypedFormComponents;
