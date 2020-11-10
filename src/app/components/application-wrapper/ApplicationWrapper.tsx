import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LanguageToggle from '@navikt/sif-common-core/lib/components/language-toggle/LanguageToggle';
import { Normaltekst } from 'nav-frontend-typografi';
import ApplicationMessages from 'common/dev-utils/intl/application-messages/ApplicationMessages';
import { Locale } from 'common/types/Locale';
import { ApplicantData } from '../../types/ApplicantData';
import { getEnvironmentVariable } from '../../utils/envUtils';
import IntlProvider, { appBokmålstekster, appNynorsktekster } from '../intl-provider/IntlProvider';

interface ApplicationWrapperProps {
    søkerdata?: ApplicantData;
    locale: Locale;
    children: React.ReactNode;
    onChangeLocale: (locale: Locale) => void;
}

const ApplicationWrapper = ({ locale, onChangeLocale, children }: ApplicationWrapperProps) => {
    return (
        <IntlProvider locale={locale}>
            <LanguageToggle locale={locale} toggle={onChangeLocale} />
            <Normaltekst tag="div">
                <Router basename={getEnvironmentVariable('PUBLIC_PATH')}>
                    {children}
                    <ApplicationMessages
                        messages={{
                            nb: appBokmålstekster,
                            nn: appNynorsktekster,
                        }}
                        title="Overføring av omsorgsdager"
                    />
                </Router>
            </Normaltekst>
        </IntlProvider>
    );
};

export default ApplicationWrapper;
