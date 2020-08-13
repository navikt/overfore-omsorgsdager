import React from 'react';
import { FormattedMessage } from 'react-intl';

const MottakerInfo = () => (
    <>
        <p>
            <FormattedMessage id="info.mottaker.1" />
        </p>
        <ul>
            <li>
                <FormattedMessage id="info.mottaker.2" />
            </li>
            <li>
                <FormattedMessage id="info.mottaker.3" />
            </li>
        </ul>
        <p>
            <FormattedMessage id="info.mottaker.4" />
        </p>
        <ul>
            <li>
                <FormattedMessage id="info.mottaker.5" />
            </li>
            <li>
                <FormattedMessage id="info.mottaker.6" />
            </li>
            <li>
                <FormattedMessage id="info.mottaker.7" />
            </li>
        </ul>
    </>
);

export default MottakerInfo;
