import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
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
                <AlertStripeInfo>
                    Siden for overføring av omsorgsdager er{' '}
                    <Lenke href="https://www.nav.no/familie/sykdom-i-familien/soknad/deling-omsorgsdager">
                        flyttet hit
                    </Lenke>
                    .
                </AlertStripeInfo>
            </Box>
        </Page>
    );
};

export default IntroPage;
