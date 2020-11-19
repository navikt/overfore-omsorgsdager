import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
// import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import { useFormikContext } from 'formik';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import { YesOrNo } from 'common/types/YesOrNo';
import { sendApplication } from '../../api/api';
import RouteConfig from '../../config/routeConfig';
import { StepID } from '../../config/stepConfig';
import { ApplicantDataContext } from '../../context/ApplicantDataContext';
import { ApplicationApiData, FosterbarnApi } from '../../types/ApplicationApiData';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import * as apiUtils from '../../utils/apiUtils';
import appSentryLogger from '../../utils/appSentryLogger';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../utils/navigationUtils';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import MedlemsskapSummary from './MedlemsskapSummary';
import SummaryBlock from './SummaryBlock';
import './oppsummering.less';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';

interface Props {
    onApplicationSent: () => void;
}

const OppsummeringStep: React.FunctionComponent<Props> = ({ onApplicationSent }: Props) => {
    const intl = useIntl();
    const formik = useFormikContext<ApplicationFormData>();
    const søkerdata = React.useContext(ApplicantDataContext);
    const history = useHistory();

    const [sendingInProgress, setSendingInProgress] = useState(false);

    async function send(data: ApplicationApiData) {
        setSendingInProgress(true);
        try {
            await sendApplication(data);
            onApplicationSent();
        } catch (error) {
            if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                navigateToLoginPage();
            } else {
                appSentryLogger.logApiError(error);
                navigateTo(RouteConfig.ERROR_PAGE_ROUTE, history);
            }
        }
    }

    if (!søkerdata) {
        return null;
    }

    const {
        person: { fornavn, mellomnavn, etternavn, fødselsnummer },
    } = søkerdata;
    const apiValues = mapFormDataToApiData(formik.values, intl.locale as Locale);
    const fosterbarn = apiValues.fosterbarn || [];
    return (
        <ApplicationStep
            id={StepID.SUMMARY}
            onValidFormSubmit={() => {
                setTimeout(() => {
                    send(apiValues); // La view oppdatere seg først
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
                    {/* Om deg */}
                    <SummarySection header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                        <Box margin="m">
                            <Normaltekst>{formatName(fornavn, etternavn, mellomnavn)}</Normaltekst>
                            <Normaltekst>Fødselsnummer: {fødselsnummer}</Normaltekst>
                        </Box>

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
                        <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.arbeidssituasjon.header')}>
                            <SummaryList
                                items={apiValues.arbeidssituasjon}
                                itemRenderer={(situasjon) => <FormattedMessage id={`arbeidssituasjon.${situasjon}`} />}
                            />
                        </SummaryBlock>
                    </SummarySection>

                    {/* Om den du skal overføre til */}
                    <SummarySection header={intlHelper(intl, 'steg.oppsummering.overførerTil.header')}>
                        <SummaryBlock header={intlHelper(intl, 'steg.mottaker.fnr.spm')}>
                            {apiValues.fnrMottaker}
                        </SummaryBlock>
                        <SummaryBlock header={intlHelper(intl, 'steg.mottaker.navn.spm')}>
                            {apiValues.navnMottaker}
                        </SummaryBlock>

                        <SummaryBlock header={intlHelper(intl, 'steg.mottaker.erYrkesaktiv.spm')}>
                            <FormattedMessage
                                id={formik.values[ApplicationFormField.erYrkesaktiv] === YesOrNo.YES ? 'Ja' : 'Nei'}
                            />
                        </SummaryBlock>
                    </SummarySection>

                    {/* Om overføringen */}
                    <SummarySection header={intlHelper(intl, 'steg.oppsummering.omOverførengingen.header')}>
                        <SummaryBlock header={intlHelper(intl, 'steg.overføring.stengingsperiode.spm')}>
                            <FormattedMessage id={`steg.oppsummering.stengingsperiode.${apiValues.stengingsperiode}`} />
                        </SummaryBlock>

                        <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.antallDager.header')}>
                            {apiValues.antallDager}
                        </SummaryBlock>
                    </SummarySection>
                    {/* Medlemskap */}
                    <SummarySection header={intlHelper(intl, 'steg.oppsummering.medlemskap.header')}>
                        <MedlemsskapSummary medlemskap={apiValues.medlemskap} />
                    </SummarySection>
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
