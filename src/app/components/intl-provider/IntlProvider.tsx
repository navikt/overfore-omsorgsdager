import React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-pluralrules/dist/locale-data/nb';
import '@formatjs/intl-pluralrules/dist/locale-data/nn';
import '@formatjs/intl-pluralrules/polyfill';
import bostedUtlandMessages from '@navikt/sif-common-forms/lib/bosted-utland/bostedUtlandMessages';
import MessagesPreview from 'common/dev-utils/intl/messages-preview/MessagesPreview';
import { allCommonMessages } from 'common/i18n/allCommonMessages';
import { Locale } from 'common/types/Locale';

const appBokmålstekster = require('../../i18n/nb.json');
const appNynorsktekster = require('../../i18n/nn.json');

const bokmålstekster = { ...allCommonMessages.nb, ...bostedUtlandMessages.nb, ...appBokmålstekster };
const nynorsktekster = { ...allCommonMessages.nn, ...bostedUtlandMessages.nn, ...appNynorsktekster };

export interface IntlProviderProps {
    locale: Locale;
}

export interface IntlProviderProps {
    locale: Locale;
    children: React.ReactNode;
    onError?: (err: any) => void;
}

const showMessagesPreview = false;

const IntlProvider = ({ locale, children, onError }: IntlProviderProps) => {
    const messages = locale === 'nb' ? bokmålstekster : nynorsktekster;
    return (
        <Provider locale={locale} messages={messages} onError={onError}>
            {children}
            {showMessagesPreview && (
                <MessagesPreview
                    title="Søknad pleiepenger"
                    showMissingTextSummary={false}
                    messages={{
                        nb: bokmålstekster,
                        nn: nynorsktekster,
                    }}
                />
            )}
        </Provider>
    );
};

export default IntlProvider;
