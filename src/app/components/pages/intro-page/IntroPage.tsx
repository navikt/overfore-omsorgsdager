import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import Alertstripe from 'nav-frontend-alertstriper';
import './introPage.less';

const bem = bemUtils('introPage');

const IntroPage: React.StatelessComponent = () => {
    const intl = useIntl();
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'introPage.tittel')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'introPage.stegTittel')} />}>
            <Box margin="xxxl" padBottom="xxl">
                <Alertstripe type="info">
                    <Lenke href="https://www.nav.no/familie/sykdom-i-familien/soknad/deling-omsorgsdager">
                        Siden for å overføre omsorgsdager er flyttet hit
                    </Lenke>
                    .
                </Alertstripe>
            </Box>
        </Page>
    );
};

export default IntroPage;
