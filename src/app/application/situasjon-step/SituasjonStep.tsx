import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import {
    validateRequiredList,
    validateYesOrNoIsAnswered,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FormikCheckboxPanelGroup } from '@navikt/sif-common-formik/lib';
import FosterbarnListAndDialog from '@navikt/sif-common-forms/lib/fosterbarn/FosterbarnListAndDialog';
import { useFormikContext } from 'formik';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormData, ApplicationFormField, Arbeidssituasjon } from '../../types/ApplicationFormData';
import { validateArbeid } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const SituasjonStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const {
        values: { harFosterbarn },
    } = useFormikContext<ApplicationFormData>();

    return (
        <ApplicationStep id={StepID.SITUASJON} onValidFormSubmit={onValidSubmit}>
            <FormikCheckboxPanelGroup<ApplicationFormField>
                legend={intlHelper(intl, 'steg.situasjon.arbeidssituasjon.spm')}
                name={ApplicationFormField.arbeidssituasjon}
                checkboxes={[
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.arbeidstaker'),
                        value: Arbeidssituasjon.arbeidstaker,
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.selvstendigNæringsdrivende'),
                        value: Arbeidssituasjon.selvstendigNæringsdrivende,
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.frilanser'),
                        value: Arbeidssituasjon.frilanser,
                    },
                ]}
                validate={validateArbeid}
            />
            <FormBlock>
                <ApplicationFormComponents.YesOrNoQuestion
                    name={ApplicationFormField.harFosterbarn}
                    legend={intlHelper(intl, 'steg.situasjon.fosterbarn.spm')}
                    validate={validateYesOrNoIsAnswered}
                />
            </FormBlock>
            {harFosterbarn === YesOrNo.YES && (
                <FormBlock margin="l">
                    <FosterbarnListAndDialog name={ApplicationFormField.fosterbarn} validate={validateRequiredList} />
                </FormBlock>
            )}
        </ApplicationStep>
    );
};

export default SituasjonStep;
