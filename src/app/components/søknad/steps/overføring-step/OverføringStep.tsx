import * as React from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import {
    validateFødselsnummer, validateRequiredField, validateRequiredSelect
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../../../config/stepConfig';
import { AntallBarnValg, SøknadFormField } from '../../../../types/SøknadFormData';
import FormikStep from '../../formik-step/FormikStep';
import TypedFormComponents from '../../typed-form-components/TypedFormComponents';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    return (
        <FormikStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit}>
            <FormBlock>
                <TypedFormComponents.RadioPanelGroup
                    name={SøknadFormField.antallBarn}
                    legend="Antall barn"
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
                <TypedFormComponents.Input
                    style={{ maxWidth: '11rem' }}
                    name={SøknadFormField.fnrMottaker}
                    label={'Hva er fødselsnummeret til den som skal motta omsorgsdagene?'}
                    validate={validateFødselsnummer}
                />
            </FormBlock>
            <FormBlock>
                <TypedFormComponents.Select
                    bredde="s"
                    name={SøknadFormField.antallDager}
                    label={'Hvor mange dager ønsker du å overføre?'}
                    validate={validateRequiredSelect}>
                    <option value={1}>1 dag</option>
                    <option value={2}>2 dager</option>
                    <option value={3}>3 dager</option>
                    <option value={4}>4 dager</option>
                    <option value={5}>5 dager</option>
                    <option value={6}>6 dager</option>
                    <option value={7}>7 dager</option>
                    <option value={8}>8 dager</option>
                    <option value={9}>9 dager</option>
                    <option value={10}>10 dager</option>
                </TypedFormComponents.Select>
            </FormBlock>
        </FormikStep>
    );
};

export default OverføringStep;
