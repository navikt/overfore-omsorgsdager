import React, { useContext } from 'react';
import { FormattedHTMLMessage, useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { validateFødselsnummer, validateRequiredField } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import {
    validateAll,
    validateFødselsnummerIsDifferentThan,
    validateNumericValue
} from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const applicantInfo = useContext(ApplicantDataContext);
    if (!applicantInfo) {
        return null;
    }
    return (
        <ApplicationStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit}>
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
                    bredde="XS"
                    name={ApplicationFormField.antallDager}
                    label={intlHelper(intl, 'steg.overføring.antallDager.spm')}
                    validate={validateAll([validateRequiredField, validateNumericValue({ min: 1, max: 999 })])}
                    inputMode="numeric"
                    max={2}
                    maxLength={2}
                    description={intlHelper(intl, 'steg.overføring.antallDager.info')}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default OverføringStep;
