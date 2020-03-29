import React from 'react';
import { FormattedMessage } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import {
    validateFødselsnummer, validateRequiredField
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { validateAll, validateNumeriValue } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    return (
        <ApplicationStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit}>
            <CounsellorPanel>
                <p>
                    <FormattedMessage id="steg.overføring.info" />
                </p>
                <ul>
                    <li>
                        <FormattedMessage id={`steg.overføring.info.li.1`} />
                    </li>
                    <li>
                        <FormattedMessage id={`steg.overføring.info.li.2`} />
                    </li>
                    <li>
                        <FormattedMessage id={`steg.overføring.info.li.3`} />
                    </li>
                </ul>
                <p>
                    <FormattedMessage id={`steg.overføring.info.valg`} />
                </p>
            </CounsellorPanel>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="M"
                    style={{ maxWidth: '11rem' }}
                    name={ApplicationFormField.fnrMottaker}
                    label={'Hva er fødselsnummeret til den som skal motta omsorgsdagene?'}
                    validate={validateFødselsnummer}
                />
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="XS"
                    name={ApplicationFormField.antallDager}
                    label={'Hvor mange dager ønsker du å overføre?'}
                    validate={validateAll([validateRequiredField, validateNumeriValue({ min: 1, max: 99 })])}
                    inputMode="numeric"
                    max={2}
                    maxLength={2}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default OverføringStep;
