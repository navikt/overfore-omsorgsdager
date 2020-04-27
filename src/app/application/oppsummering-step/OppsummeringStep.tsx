import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import { sendApplication } from '../../api/api';
import RouteConfig from '../../config/routeConfig';
import { StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicantData } from '../../types/ApplicantData';
import { ApplicationApiData, FosterbarnApi } from '../../types/ApplicationApiData';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import * as apiUtils from '../../utils/apiUtils';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../utils/navigationUtils';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import MedlemsskapSummary from './MedlemsskapSummary';
import SummaryBlock from './SummaryBlock';
import './oppsummering.less';

interface Props {
    onApplicationSent: () => void;
}

const OppsummeringStep: React.StatelessComponent<Props> = ({ onApplicationSent }) => {
    const intl = useIntl();
    const formik = useFormikContext<ApplicationFormData>();
    const søkerdata = React.useContext(ApplicantDataContext);
    const history = useHistory();

    const [sendingInProgress, setSendingInProgress] = useState(false);

    async function send(data: ApplicationApiData, søker: ApplicantData) {
        setSendingInProgress(true);
        try {
            await sendApplication(data);
            onApplicationSent();
        } catch (error) {
            if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                navigateToLoginPage();
            } else {
                navigateTo(RouteConfig.ERROR_PAGE_ROUTE, history);
            }
        }
    }

    if (!søkerdata) {
        return null;
    }

    const {
        person: { fornavn, mellomnavn, etternavn, fødselsnummer }
    } = søkerdata;
    const apiValues = mapFormDataToApiData(formik.values, intl.locale as Locale);
    const fosterbarn = apiValues.fosterbarn || [];
    return (
        <ApplicationStep
            id={StepID.SUMMARY}
            onValidFormSubmit={() => {
                setTimeout(() => {
                    send(apiValues, søkerdata); // La view oppdatere seg først
                });
            }}
            useValidationErrorSummary={false}
            buttonDisabled={sendingInProgress}
            showButtonSpinner={sendingInProgress}>
            <CounsellorPanel>
                <FormattedMessage id="steg.oppsummering.info" />
            </CounsellorPanel>
            <Box margin="xl">
                <Panel border={true}>
                    <ContentWithHeader header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                        <Normaltekst>{formatName(fornavn, etternavn, mellomnavn)}</Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id="steg.oppsummering.søker.fnr" values={{ fødselsnummer }} />
                        </Normaltekst>
                    </ContentWithHeader>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.arbeidssituasjon.header')}>
                        <SummaryList
                            items={apiValues.arbeidssituasjon}
                            itemRenderer={(situasjon) => <FormattedMessage id={`arbeidssituasjon.${situasjon}`} />}
                        />
                    </SummaryBlock>
                    {fosterbarn.length > 0 && (
                        <>
                            <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.fosterbarn.header')}>
                                <SummaryList
                                    items={fosterbarn}
                                    itemRenderer={(barn: FosterbarnApi) => <>{barn.fødselsnummer}</>}
                                />
                            </SummaryBlock>
                        </>
                    )}
                    <SummaryBlock header={intlHelper(intl, 'steg.overføring.fnr.spm')}>
                        {apiValues.fnrMottaker}
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'steg.overføring.navn.spm')}>
                        {apiValues.navnMottaker}
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'steg.overføring.erYrkesaktiv.spm')}>
                        <FormattedMessage id={apiValues.mottakerErYrkesaktiv ? 'Ja' : 'Nei'} />
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.antallDager.header')}>
                        {apiValues.antallDager}
                    </SummaryBlock>

                    <MedlemsskapSummary medlemskap={apiValues.medlemskap} />
                </Panel>
            </Box>

            <Box margin="l">
                <ApplicationFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={ApplicationFormField.harBekreftetOpplysninger}
                    validate={(value) => {
                        let result;
                        if (value !== true) {
                            result = intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet');
                        }
                        return result;
                    }}
                />
            </Box>
        </ApplicationStep>
    );
};

export default OppsummeringStep;
