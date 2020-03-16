import React from 'react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import ContentWithHeader from '@navikt/sif-common-core/lib/components/content-with-header/ContentWithHeader';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import { HistoryProps } from '@navikt/sif-common-core/lib/types/History';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core/lib/utils/personUtils';
import Panel from 'nav-frontend-paneler';
import { Normaltekst } from 'nav-frontend-typografi';
import { sendApplication } from '../../../../api/api';
import RouteConfig from '../../../../config/routeConfig';
import { StepID } from '../../../../config/stepConfig';
import { SøkerdataContext } from '../../../../context/SøkerdataContext';
import { Søkerdata } from '../../../../types/Søkerdata';
import { SøknadApiData } from '../../../../types/SøknadApiData';
import { SøknadFormData, SøknadFormField } from '../../../../types/SøknadFormData';
import * as apiUtils from '../../../../utils/apiUtils';
import { mapFormDataToApiData } from '../../../../utils/mapFormDataToApiData';
import { navigateTo, navigateToLoginPage } from '../../../../utils/navigationUtils';
import TypedForm from '../../../TypedForm/TypedForm';
import FormikStep from '../../formik-step/FormikStep';
import MedlemsskapSummary from './MedlemsskapSummary';
import './summary.less';

interface State {
    sendingInProgress: boolean;
}

interface OwnProps {
    values: SøknadFormData;
    onApplicationSent: (apiValues: SøknadApiData, søkerdata: Søkerdata) => void;
}

type Props = OwnProps & HistoryProps & WrappedComponentProps;

class SummaryStep extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sendingInProgress: false
        };
        this.navigate = this.navigate.bind(this);
    }

    async navigate(apiValues: SøknadApiData, søkerdata: Søkerdata) {
        const { onApplicationSent, history } = this.props;
        this.setState({
            sendingInProgress: true
        });
        try {
            await sendApplication(apiValues);
            onApplicationSent(apiValues, søkerdata);
        } catch (error) {
            if (apiUtils.isForbidden(error) || apiUtils.isUnauthorized(error)) {
                navigateToLoginPage();
            } else {
                navigateTo(RouteConfig.ERROR_PAGE_ROUTE, history);
            }
        }
    }

    render() {
        const { values, intl } = this.props;
        const { sendingInProgress } = this.state;
        const søkerdata = React.useContext(SøkerdataContext);

        if (!søkerdata) {
            return null;
        }

        const {
            person: { fornavn, mellomnavn, etternavn, fødselsnummer }
        } = søkerdata;
        const apiValues = mapFormDataToApiData(values, intl.locale as Locale);

        const { medlemskap } = apiValues;

        return (
            <FormikStep
                id={StepID.SUMMARY}
                onValidFormSubmit={() => {
                    setTimeout(() => {
                        // La view oppdatere seg først
                        this.navigate(apiValues, søkerdata);
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
                    </Panel>
                </Box>

                <MedlemsskapSummary medlemskap={medlemskap} />

                <Box margin="l">
                    <TypedForm.ConfirmationCheckbox
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
            </FormikStep>
        );
    }
}

export default injectIntl(SummaryStep);
