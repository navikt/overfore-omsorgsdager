import * as React from 'react';
import { useIntl } from 'react-intl';
import { FormikCheckboxPanelGroup } from '@navikt/sif-common-formik/lib';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps, StepID } from '../../../../config/stepConfig';
import { Arbeidssituasjon, SøknadFormField } from '../../../../types/SøknadFormData';
import { validateArbeid } from '../../../../validation/fieldValidations';
import FormikStep from '../../formik-step/FormikStep';

const ArbeidStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    return (
        <FormikStep id={StepID.ARBEID} onValidFormSubmit={onValidSubmit}>
            <FormikCheckboxPanelGroup<SøknadFormField>
                legend={intlHelper(intl, 'steg.arbeid.spm')}
                name={SøknadFormField.arbeidssituasjon}
                checkboxes={[
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.arbeidstaker'),
                        value: Arbeidssituasjon.arbeidstaker
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.selvstendigNæringsdrivende'),
                        value: Arbeidssituasjon.selvstendigNæringsdrivende
                    },
                    {
                        label: intlHelper(intl, 'arbeidssituasjon.frilanser'),
                        value: Arbeidssituasjon.frilanser
                    }
                ]}
                validate={validateArbeid}
            />
        </FormikStep>
    );
};

// Todo - kommer ikke videre ved første valg

export default ArbeidStep;
