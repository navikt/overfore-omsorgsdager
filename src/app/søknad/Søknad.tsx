import * as React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import IkkeMyndigPage from '../components/pages/ikke-myndig-page/IkkeMyndigPage';
import { initialSøknadValues, SøknadFormData } from '../types/SøknadFormData';
import SøknadEssentialsLoader from './SøknadEssentialsLoader';
import SøknadRoutes from './SøknadRoutes';

const Søknad = () => (
    <SøknadEssentialsLoader
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
                    renderForm={() => <SøknadRoutes />}
                />
            );
        }}
    />
);

export default Søknad;
