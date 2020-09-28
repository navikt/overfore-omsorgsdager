import getSentryLoggerForApp from '@navikt/sif-common-sentry';

const appSentryLogger = getSentryLoggerForApp('overfore-omsorgsdager', ['sykdom-i-familien']);

export default appSentryLogger;
