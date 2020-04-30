import React, { useContext } from 'react';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
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
                <FormattedHTMLMessage id="info.overføring.html" />
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
                        <FormattedHTMLMessage id="steg.overføring.erYrkesaktiv.info" />
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
