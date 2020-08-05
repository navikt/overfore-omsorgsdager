import React from 'react';
import { FormattedMessage } from 'react-intl';

const OverforeTilInfo = () => (
    <>
        <p>
            <FormattedMessage id="info.overføreTil.1" />
        </p>
        <ul>
            <li>
                <FormattedMessage id="info.overføreTil.2" />
            </li>
            <li>
                <FormattedMessage id="info.overføreTil.3" />
            </li>
        </ul>
        <p>
            <FormattedMessage id="info.overføreTil.4" />
        </p>
        <ul>
            <li>
                <FormattedMessage id="info.overføreTil.5" />
            </li>
            <li>
                <FormattedMessage id="info.overføreTil.6" />
            </li>
            <li>
                <FormattedMessage id="info.overføreTil.7" />
            </li>
        </ul>
    </>
);

export default OverforeTilInfo;
