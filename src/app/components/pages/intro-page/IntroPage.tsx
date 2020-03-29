import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    commonFieldErrorRenderer
} from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import InformationPoster from 'common/components/information-poster/InformationPoster';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import RouteConfig, { getRouteUrl } from '../../../config/routeConfig';

const bem = bemUtils('introPage');

enum PageFormField {
    'mottakerErGyldig' = 'mottakerErGyldig'
}

interface PageFormValues {
    [PageFormField.mottakerErGyldig]: YesOrNo;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues>();
const getText = (part: string) => <FormattedMessage id={`introPage.${part}`} />;

const IntroPage: React.StatelessComponent = () => {
    const intl = useIntl();
    const initialValues = {};
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'introPage.tittel')}
            topContentRenderer={() => <StepBanner text={intlHelper(intl, 'introPage.stegTittel')} />}>
            <Box margin="xxxl" padBottom="xxl">
                <InformationPoster>
                    <p>Du kan overføre omsorgsdager til en annen omsorgsperson, det kan være</p>
                    <ul>
                        <li>den andre forelderen</li>
                        <li>nåværende samboer eller ektefelle</li>
                    </ul>
                    <FormattedMessage id="introPage.informationposter" />
                    <ul>
                        <li>{getText('informationposter.li.1')}</li>
                        <li>{getText('informationposter.li.2')}</li>
                        <li>{getText('informationposter.li.3')}</li>
                    </ul>
                </InformationPoster>
            </Box>

            <PageForm.FormikWrapper
                onSubmit={() => null}
                initialValues={initialValues}
                renderForm={({ values: { mottakerErGyldig } }) => (
                    <PageForm.Form
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeButtons={false}>
                        <PageForm.YesOrNoQuestion
                            name={PageFormField.mottakerErGyldig}
                            legend={intlHelper(intl, 'introPage.mottaker.spm')}
                        />
                        {mottakerErGyldig === YesOrNo.NO && (
                            <Box margin="l">
                                <AlertStripeAdvarsel>
                                    Hvis personen ikke er arbeidstaker, selvstendig næringsdrivende eller frilanser, er
                                    det ikke mulig å overføre omsorgsdager.
                                </AlertStripeAdvarsel>
                            </Box>
                        )}

                        {mottakerErGyldig === YesOrNo.YES && (
                            <Box margin="xl" textAlignCenter={true}>
                                <Lenke href={getRouteUrl(RouteConfig.WELCOMING_PAGE_ROUTE)}>
                                    <FormattedMessage id="gotoApplicationLink.lenketekst" />
                                </Lenke>
                            </Box>
                        )}
                    </PageForm.Form>
                )}
            />
        </Page>
    );
};

export default IntroPage;
