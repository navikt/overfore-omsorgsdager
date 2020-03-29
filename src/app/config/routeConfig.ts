import { getEnvironmentVariable } from 'app/utils/envUtils';

enum RouteConfig {
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    APPLICATION_ROUTE_PREFIX = '/melding',
    ERROR_PAGE_ROUTE = '/melding/feil',
    WELCOMING_PAGE_ROUTE = '/melding/velkommen',
    APPLICATION_SENDT_ROUTE = '/melding/melding-sendt'
}

export const getRouteUrl = (route: RouteConfig): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;

export default RouteConfig;
