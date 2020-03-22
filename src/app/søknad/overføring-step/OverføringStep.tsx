import * as React from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import {
    validateFødselsnummer, validateRequiredField
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { AntallBarnValg, SøknadFormField } from '../../types/SøknadFormData';
import { validateAll, validateNumeriValue } from '../../validation/fieldValidations';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadStep from '../SøknadStep';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    return (
        <SøknadStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit}>
            <FormBlock>
                <SøknadFormComponents.RadioPanelGroup
                    name={SøknadFormField.antallBarn}
                    legend="Hvor mange barn, inkludert fosterbarn, har du i husstanden?"
                    radios={[
                        {
                            label: 'Ett barn',
                            value: AntallBarnValg.ett
                        },
                        {
                            label: 'To barn',
                            value: AntallBarnValg.to
                        },
                        {
                            label: 'Tre eller flere barn',
                            value: AntallBarnValg.treEllerFlere
                        }
                    ]}
                    validate={validateRequiredField}
                />
            </FormBlock>
            <FormBlock>
                <SøknadFormComponents.Input
                    bredde="M"
                    style={{ maxWidth: '11rem' }}
                    name={SøknadFormField.fnrMottaker}
                    label={'Hva er fødselsnummeret til den som skal motta omsorgsdagene?'}
                    validate={validateFødselsnummer}
                />
            </FormBlock>
            <FormBlock>
                <SøknadFormComponents.Input
                    bredde="XS"
                    name={SøknadFormField.antallDager}
                    label={'Hvor mange dager ønsker du å overføre?'}
                    validate={validateAll([validateRequiredField, validateNumeriValue({ min: 1, max: 99 })])}
                    inputMode="numeric"
                    max={2}
                    maxLength={2}
                />
            </FormBlock>
        </SøknadStep>
    );
};

export default OverføringStep;
