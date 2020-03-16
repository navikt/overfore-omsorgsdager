import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { SøknadFormData, SøknadFormField } from '../../types/SøknadFormData';

const TypedForm = getTypedFormComponents<SøknadFormField, SøknadFormData>();

export default TypedForm;
