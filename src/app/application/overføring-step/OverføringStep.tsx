/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { validateRequiredField } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { FormikRadioPanelGroup } from '@navikt/sif-common-formik/lib';
import { useFormikContext } from 'formik';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicationFormData, ApplicationFormField, Stengingsperiode } from '../../types/ApplicationFormData';
import { validateAll, validateNumericValue } from '../../validation/fieldValidations';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import OverføringInfo from '../../components/information/overføring-info/OverføringInfo';
import Lenke from 'nav-frontend-lenker';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    const applicantInfo = useContext(ApplicantDataContext);

    if (!applicantInfo) {
        return null;
    }

    const { values } = useFormikContext<ApplicationFormData>();
    const buttonDisabled = values.stengingsperiode === Stengingsperiode.annen;

    return (
        <ApplicationStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit} buttonDisabled={buttonDisabled}>
            <CounsellorPanel>
                <OverføringInfo />
            </CounsellorPanel>
            <FormBlock>
                <FormikRadioPanelGroup
                    legend={intlHelper(intl, 'steg.overføring.stengingsperiode.spm')}
                    name={ApplicationFormField.stengingsperiode}
                    radios={[
                        {
                            label: intlHelper(intl, 'steg.overføring.stengingsperiode.mars13tilJuni30'),
                            value: Stengingsperiode.mars13tilJuni30,
                        },
                        {
                            label: intlHelper(intl, 'steg.overføring.stengingsperiode.etterAugust9'),
                            value: Stengingsperiode.etterAugust9,
                        },
                        {
                            label: intlHelper(intl, 'steg.overføring.stengingsperiode.annen'),
                            value: Stengingsperiode.annen,
                        },
                    ]}
                />
            </FormBlock>
            {values.stengingsperiode === Stengingsperiode.annen && (
                <Box margin="l">
                    <AlertStripeAdvarsel>
                        <FormattedMessage id="steg.overføring.info.annenStengingsperiode.1" />
                        <br />
                        <FormattedMessage id="steg.overføring.info.annenStengingsperiode.2.a" />{' '}
                        <Lenke
                            href="https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Slik-kan-du-dele-omsorgsdagene-dine"
                            target="_blank">
                            <FormattedMessage id="steg.overføring.info.annenStengingsperiode.2.b" />
                        </Lenke>
                        .
                    </AlertStripeAdvarsel>
                </Box>
            )}
            {values.stengingsperiode !== Stengingsperiode.annen && (
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
            )}
        </ApplicationStep>
    );
};

export default OverføringStep;
