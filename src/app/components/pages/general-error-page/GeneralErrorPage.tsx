import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import intlHelper from 'common/utils/intlUtils';
import VeilederLokal from './VeilederLokal';
import './generalErrorPage.less';

const GeneralErrorPage: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <Veilederpanel type="plakat" kompakt={true} fargetema="normal" svg={<VeilederLokal mood="uncertain" />}>
                    <Systemtittel tag="h2">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Systemtittel>
                    <Box margin="m" padBottom="l">
                        <Ingress>
                            <FormattedMessage id="page.generalErrorPage.tekst" />
                        </Ingress>
                    </Box>
                </Veilederpanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
