/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import {
    validateFødselsnummer,
    validateRequiredField,
    validateYesOrNoIsAnswered,
} from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { useFormikContext } from 'formik';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Box from 'common/components/box/Box';
import { YesOrNo } from 'common/types/YesOrNo';
import MottakerInfo from '../../components/information/mottaker-info/MottakerInfo';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import { validateAll, validateFødselsnummerIsDifferentThan } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const MottakerStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const applicantInfo = useContext(ApplicantDataContext);
    if (!applicantInfo) {
        return null;
    }
    const { values } = useFormikContext<ApplicationFormData>();

    return (
        <ApplicationStep
            id={StepID.MOTTAKER}
            onValidFormSubmit={onValidSubmit}
            buttonDisabled={values[ApplicationFormField.erYrkesaktiv] === YesOrNo.NO}>
            <CounsellorPanel>
                <MottakerInfo />
            </CounsellorPanel>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="M"
                    style={{ maxWidth: '11rem' }}
                    name={ApplicationFormField.fnrMottaker}
                    label={intlHelper(intl, 'steg.mottaker.fnr.spm')}
                    validate={validateAll([
                        validateFødselsnummer,
                        validateFødselsnummerIsDifferentThan(applicantInfo.person.fødselsnummer),
                    ])}
                />
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.Input
                    bredde="XL"
                    name={ApplicationFormField.navnMottaker}
                    label={intlHelper(intl, 'steg.mottaker.navn.spm')}
                    validate={validateRequiredField}
                />
            </FormBlock>
            <FormBlock>
                <ApplicationFormComponents.YesOrNoQuestion
                    name={ApplicationFormField.erYrkesaktiv}
                    legend={intlHelper(intl, 'steg.mottaker.erYrkesaktiv.spm')}
                    validate={validateYesOrNoIsAnswered}
                />
            </FormBlock>

            {values[ApplicationFormField.erYrkesaktiv] === YesOrNo.NO && (
                <Box margin="l">
                    <AlertStripeAdvarsel>
                        <FormattedMessage
                            id="steg.mottaker.ikkeYrkesaktiv.info.html"
                            values={{ strong: (cnt: string) => <strong>{cnt}</strong> }}></FormattedMessage>
                    </AlertStripeAdvarsel>
                </Box>
            )}
        </ApplicationStep>
    );
};

export default MottakerStep;
