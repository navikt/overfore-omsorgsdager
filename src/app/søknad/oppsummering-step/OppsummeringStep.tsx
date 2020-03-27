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
import { SøkerdataContext } from '../../context/SøkerdataContext';
import { Søkerdata } from '../../types/Søkerdata';
import { FosterbarnApi, SøknadApiData } from '../../types/SøknadApiData';
import { SøknadFormData, SøknadFormField } from '../../types/SøknadFormData';
import * as apiUtils from '../../utils/apiUtils';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../utils/navigationUtils';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadStep from '../SøknadStep';
import MedlemsskapSummary from './MedlemsskapSummary';
import SummaryBlock from './SummaryBlock';
import './oppsummering.less';

interface Props {
    onApplicationSent: (apiValues: SøknadApiData, søkerdata: Søkerdata) => void;
}

const OppsummeringStep: React.StatelessComponent<Props> = ({ onApplicationSent }) => {
    const intl = useIntl();
    const formik = useFormikContext<SøknadFormData>();
    const søkerdata = React.useContext(SøkerdataContext);
    const history = useHistory();

    const [sendingInProgress, setSendingInProgress] = useState(false);

    async function send(data: SøknadApiData, søker: Søkerdata) {
        setSendingInProgress(true);
        try {
            await sendApplication(data);
            onApplicationSent(apiValues, søker);
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
        <SøknadStep
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
                    <SummaryBlock header="Hva er din arbeidssituasjon?">
                        <SummaryList
                            items={apiValues.arbeidssituasjon}
                            itemRenderer={(situasjon) => <FormattedMessage id={`arbeidssituasjon.${situasjon}`} />}
                        />
                    </SummaryBlock>
                    {fosterbarn.length > 0 && (
                        <>
                            <SummaryBlock header="Fosterbarn">
                                <SummaryList
                                    items={fosterbarn}
                                    itemRenderer={(barn: FosterbarnApi) => (
                                        <>
                                            {barn.fødselsnummer} - {formatName(barn.fornavn, barn.etternavn)}
                                        </>
                                    )}
                                />
                            </SummaryBlock>
                        </>
                    )}
                    <SummaryBlock header="Hva er fødselsnummeret til den som skal motta omsorgsdagene?">
                        {apiValues.fnrMottaker}
                    </SummaryBlock>

                    <SummaryBlock header="Hvor mange dager ønsker du å overføre?">{apiValues.antallDager}</SummaryBlock>

                    <MedlemsskapSummary medlemskap={apiValues.medlemskap} />
                </Panel>
            </Box>

            <Box margin="l">
                <SøknadFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={SøknadFormField.harBekreftetOpplysninger}
                    validate={(value) => {
                        let result;
                        if (value !== true) {
                            result = intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger.ikkeBekreftet');
                        }
                        return result;
                    }}
                />
            </Box>
        </SøknadStep>
    );
};

export default OppsummeringStep;
