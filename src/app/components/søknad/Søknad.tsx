import * as React from 'react';
import { TypedFormikWrapper } from '@navikt/sif-common-formik/lib';
import { initialValues, SøknadFormData } from '../../types/SøknadFormData';
import AppEssentialsLoader from '../app-essentials-loader/AppEssentialsLoader';
import IkkeMyndigPage from '../pages/ikke-myndig-page/IkkeMyndigPage';
import SøknadContent from './SøknadContent';

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
                    initialValues={initialValues}
                    onSubmit={() => null}
                    renderForm={() => <SøknadContent />}
                />
            );
        }}
    />
);

export default Søknad;
