import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
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
import MottakerInfo from '../../information/mottaker-info/MottakerInfo';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';

const bem = bemUtils('introPage');

enum PageFormField {
    'mottakerErGyldig' = 'mottakerErGyldig',
    'gjelderKoronastenging' = 'gjelderKoronastenging',
}

interface PageFormValues {
    [PageFormField.mottakerErGyldig]: YesOrNo;
    [PageFormField.gjelderKoronastenging]: YesOrNo;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues>();

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
                    <MottakerInfo />
                </InformationPoster>
            </Box>

            <PageForm.FormikWrapper
                onSubmit={() => null}
                initialValues={initialValues}
                renderForm={({ values: { mottakerErGyldig, gjelderKoronastenging } }) => (
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
                                    <FormattedMessage id="introPage.melding.stopp" />
                                </AlertStripeAdvarsel>
                            </Box>
                        )}
                        {mottakerErGyldig === YesOrNo.YES && (
                            <>
                                <FormBlock>
                                    <PageForm.YesOrNoQuestion
                                        name={PageFormField.gjelderKoronastenging}
                                        legend={intlHelper(intl, 'introPage.gjelderKoronastenging.spm')}
                                    />
                                </FormBlock>
                                {gjelderKoronastenging === YesOrNo.NO && (
                                    <Box margin="l">
                                        <AlertStripeAdvarsel>
                                            <FormattedMessage id="introPage.melding.stopp.koronastenging.1" />
                                            <br />
                                            <FormattedMessage id="introPage.melding.stopp.koronastenging.2.a" />{' '}
                                            <Lenke
                                                href="https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Slik-kan-du-dele-omsorgsdagene-dine"
                                                target="_blank">
                                                <FormattedMessage id="introPage.melding.stopp.koronastenging.2.b" />
                                            </Lenke>
                                            .
                                        </AlertStripeAdvarsel>
                                    </Box>
                                )}
                            </>
                        )}
                        {mottakerErGyldig === YesOrNo.YES && gjelderKoronastenging === YesOrNo.YES && (
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
