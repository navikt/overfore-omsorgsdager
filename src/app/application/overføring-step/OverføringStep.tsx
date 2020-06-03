import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import {
    validateFødselsnummer,
    validateRequiredField,
    validateYesOrNoIsAnswered
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import {
    validateAll,
    validateFødselsnummerIsDifferentThan,
    validateNumericValue
} from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Box from 'common/components/box/Box';
import { useFormikContext } from 'formik';
import { YesOrNo } from 'common/types/YesOrNo';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const applicantInfo = useContext(ApplicantDataContext);
    if (!applicantInfo) {
        return null;
    }
    const { values } = useFormikContext<ApplicationFormData>();

    return (
        <ApplicationStep
            id={StepID.OVERFØRING}
            onValidFormSubmit={onValidSubmit}
            buttonDisabled={values[ApplicationFormField.erYrkesaktiv] === YesOrNo.NO}>
            <CounsellorPanel>
                <p>Du kan overføre omsorgsdager til en annen omsorgsperson, det kan være</p>
                <ul>
                    <li>den andre forelderen</li>
                    <li>nåværende samboer eller ektefelle</li>
                </ul>
                <p>
                    Den du skal overføre omsorgsdager til må være yrkesaktiv, altså være èn eller flere av punktene
                    under:
                </p>
                <ul>
                    <li>arbeidstaker</li>
                    <li>selvstendig næringsdrivende</li>
                    <li>frilanser</li>
                </ul>
            </CounsellorPanel>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="M"
                    style={{ maxWidth: '11rem' }}
                    name={ApplicationFormField.fnrMottaker}
                    label={intlHelper(intl, 'steg.overføring.fnr.spm')}
                    validate={validateAll([
                        validateFødselsnummer,
                        validateFødselsnummerIsDifferentThan(applicantInfo.person.fødselsnummer)
                    ])}
                />
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="XL"
                    name={ApplicationFormField.navnMottaker}
                    label={intlHelper(intl, 'steg.overføring.navn.spm')}
                    validate={validateRequiredField}
                />
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.YesOrNoQuestion
                    name={ApplicationFormField.erYrkesaktiv}
                    legend={intlHelper(intl, 'steg.overføring.erYrkesaktiv.spm')}
                    validate={validateYesOrNoIsAnswered}
                />
            </FormBlock>

            {values[ApplicationFormField.erYrkesaktiv] === YesOrNo.NO && (
                <Box margin="l">
                    <AlertStripeAdvarsel>
                        Man <strong>må</strong> være yrkesaktiv for å ha rett til å bruke omsorgsdager. Du kan ikke
                        overføre omsorgsdager til en person som ikke er yrkesaktiv.
                    </AlertStripeAdvarsel>
                </Box>
            )}

            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="XS"
                    name={ApplicationFormField.antallDager}
                    label={intlHelper(intl, 'steg.overføring.antallDager.spm')}
                    validate={validateAll([validateRequiredField, validateNumericValue({ min: 1, max: 999 })])}
                    inputMode="numeric"
                    min={1}
                    max={999}
                    maxLength={3}
                    description={intlHelper(intl, 'steg.overføring.antallDager.info')}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default OverføringStep;
