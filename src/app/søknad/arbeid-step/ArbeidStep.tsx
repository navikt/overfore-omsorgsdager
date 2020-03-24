import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import {
    validateRequiredList, validateYesOrNoIsAnswered
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FormikCheckboxPanelGroup } from '@navikt/sif-common-formik/lib';
import FosterbarnListAndDialog from '@navikt/sif-common-forms/lib/fosterbarn/FosterbarnListAndDialog';
import { useFormikContext } from 'formik';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { Arbeidssituasjon, SøknadFormData, SøknadFormField } from '../../types/SøknadFormData';
import { validateArbeid } from '../../validation/fieldValidations';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadStep from '../SøknadStep';

const ArbeidStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const {
        values: { harFosterbarn }
    } = useFormikContext<SøknadFormData>();

    return (
        <SøknadStep id={StepID.ARBEID} onValidFormSubmit={onValidSubmit}>
            <FormikCheckboxPanelGroup<SøknadFormField>
                legend={intlHelper(intl, 'steg.arbeid.spm')}
                name={SøknadFormField.arbeidssituasjon}
                checkboxes={[
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.arbeidstaker'),
                        value: Arbeidssituasjon.arbeidstaker
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.selvstendigNæringsdrivende'),
                        value: Arbeidssituasjon.selvstendigNæringsdrivende
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.frilanser'),
                        value: Arbeidssituasjon.frilanser
                    }
                ]}
                validate={validateArbeid}
            />
            <FormBlock>
                <SøknadFormComponents.YesOrNoQuestion
                    name={SøknadFormField.harFosterbarn}
                    legend="Har du fosterbarn?"
                    validate={validateYesOrNoIsAnswered}
                />
            </FormBlock>
            {harFosterbarn === YesOrNo.YES && (
                <FormBlock margin="l">
                    <FosterbarnListAndDialog name={SøknadFormField.fosterbarn} validate={validateRequiredList} />
                </FormBlock>
            )}
        </SøknadStep>
    );
};

export default ArbeidStep;
