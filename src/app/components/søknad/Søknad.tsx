import * as React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { initialSøknadValues, SøknadFormData } from '../../types/SøknadFormData';
import IkkeMyndigPage from '../pages/ikke-myndig-page/IkkeMyndigPage';
import SøknadContent from './SøknadContent';
import AppEssentialsLoader from './SøknadEssentialsLoader';

const Søknad = () => (
    <AppEssentialsLoader
        contentLoadedRenderer={(søkerdata) => {
            if (søkerdata) {
                const { person } = søkerdata;
                if (!person.myndig) {
                    return <IkkeMyndigPage />;
                }
            }
            return (
                <TypedFormikWrapper<SøknadFormData>
                    initialValues={initialSøknadValues}
                    onSubmit={() => null}
                    renderForm={() => <SøknadContent />}
                />
            );
        }}
    />
);

export default Søknad;
