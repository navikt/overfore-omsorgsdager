import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Box from 'common/components/box/Box';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import './unavailablePage.less';
import { FormattedMessage } from 'react-intl';

const bem = bemUtils('introPage');

const UnavailablePage: React.StatelessComponent<{}> = () => {
    const title = 'Melding om overføring av omsorgsdager';
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <StepBanner text={title} />}>
            <Box margin="xxxl">
                <AlertStripeAdvarsel>
                    <p>
                        <FormattedMessage id="page.unavailable.info.1" />
                    </p>
                    <p>
                        <FormattedMessage id="page.unavailable.info.2" />
                    </p>
                </AlertStripeAdvarsel>
            </Box>
        </Page>
    );
};

export default UnavailablePage;
