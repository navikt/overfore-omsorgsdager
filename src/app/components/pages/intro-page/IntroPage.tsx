import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    commonFieldErrorRenderer
} from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import Lenke from 'nav-frontend-lenker';
import Box from 'common/components/box/Box';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import InformationPoster from 'common/components/information-poster/InformationPoster';
import Page from 'common/components/page/Page';
import StepBanner from 'common/components/step-banner/StepBanner';
import bemUtils from 'common/utils/bemUtils';
import RouteConfig, { getRouteUrl } from '../../../config/routeConfig';
import CoronaWarning from '../../information/corona-warning/CoronaWarning';

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
                renderForm={({ values: { mottakerErGyldig } }) => (
                    <PageForm.Form
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeButtons={false}>
                        <PageForm.YesOrNoQuestion
                            name={PageFormField.mottakerErGyldig}
                            legend="Er den du skal overføre omsorgsdager til arbeidstaker, selvstendig næringsdrivende eller frilanser?"
                        />
                        {mottakerErGyldig === YesOrNo.NO && (
                            <Box margin="l">
                                <CounsellorPanel>
                                    <strong>
                                        <FormattedMessage id="introPage.informationposter" />
                                    </strong>
                                    <ul>
                                        <li>{getText('informationposter.li.1')}</li>
                                        <li>{getText('informationposter.li.2')}</li>
                                        <li>{getText('informationposter.li.3')}</li>
                                    </ul>
                                </CounsellorPanel>
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
