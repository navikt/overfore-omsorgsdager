import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    commonFieldErrorRenderer
} from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import InformationPoster from 'common/components/information-poster/InformationPoster';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import RouteConfig, { getRouteUrl } from '../../../config/routeConfig';
import CoronaWarning from '../../information/corona-warning/CoronaWarning';

const bem = bemUtils('introPage');

enum PageFormField {
    'harSamfunnskritiskJobb' = 'harSamfunnskritiskJobb'
}

interface PageFormValues {
    [PageFormField.harSamfunnskritiskJobb]: YesOrNo;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues>();
const getText = (part: string) => <FormattedMessage id={`introPage.${part}`} />;

const IntroPage: React.StatelessComponent = () => {
    const intl = useIntl();
    const initialValues = {};
    return (
        <Page
            className={bem.block}
            title="Overføring av omsorgsdager"
            topContentRenderer={() => <StepBanner text="Kan jeg bruke den digitale søknaden?" />}>
            <Box margin="xl" padBottom="l">
                <CoronaWarning />
            </Box>
            <Box margin="xxxl" padBottom="xxl">
                <InformationPoster>
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
                renderForm={({ values: { harSamfunnskritiskJobb } }) => (
                    <PageForm.Form
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeButtons={false}>
                        <PageForm.YesOrNoQuestion
                            name={PageFormField.harSamfunnskritiskJobb}
                            legend="Har du en jobb som faller inn under samfunnskritiske funksjoner?"
                            description={
                                <>
                                    <Lenke
                                        target="_blank"
                                        href="https://www.ks.no/fagomrader/helse-og-omsorg/informasjon-om-koronaviruset/samfunnets-kritiske-funksjoner/">
                                        Se hele listen over jobbene som faller inn samfunnskritiske funksjoner her
                                    </Lenke>
                                    .
                                </>
                            }
                        />
                        {harSamfunnskritiskJobb === YesOrNo.NO && (
                            <Box margin="l">
                                <CounsellorPanel>
                                    <FormattedMessage id="introPage.counsellor" /><br/>
                                    <Lenke
                                        target="_blank"
                                        href="https://www.ks.no/fagomrader/helse-og-omsorg/informasjon-om-koronaviruset/samfunnets-kritiske-funksjoner/">
                                        FIXME: Les om andre muligheter for å dele omsorgsdagene dine
                                    </Lenke>
                                </CounsellorPanel>
                            </Box>
                        )}

                        {harSamfunnskritiskJobb === YesOrNo.YES && (
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
