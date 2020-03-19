import * as React from 'react';
import { useIntl } from 'react-intl';
import { YesOrNo, FormikCheckboxPanelGroup } from '@navikt/sif-common-formik/lib';
import intlHelper from 'common/utils/intlUtils';
import { StepConfigProps, StepID } from '../../../../config/stepConfig';
import { Arbeidssituasjon, SøknadFormData, SøknadFormField } from '../../../../types/SøknadFormData';
import { validateArbeid } from '../../../../validation/fieldValidations';
import FormikStep from '../../formik-step/FormikStep';
import FormBlock from 'common/components/form-block/FormBlock';
import TypedFormComponents from '../../typed-form-components/TypedFormComponents';
import { validateYesOrNoIsAnswered } from 'common/validation/fieldValidations';
import Lenke from 'nav-frontend-lenker';
import { useFormikContext } from 'formik';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';

const ArbeidStep = ({ onValidSubmit }: StepConfigProps) => {
    const { values: formValues } = useFormikContext<SøknadFormData>();
    const intl = useIntl();
    return (
        <FormikStep
            id={StepID.ARBEID}
            onValidFormSubmit={() => {
                const harSamfunnskritiskJobb = formValues.harSamfunnskritiskJobb === YesOrNo.YES;
                return harSamfunnskritiskJobb ? onValidSubmit() : false;
            }}>
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
            <FormBlock>
                <TypedFormComponents.YesOrNoQuestion
                    name={SøknadFormField.harSamfunnskritiskJobb}
                    legend={'Har du en jobb som faller inn under samfunnskritiske funksjoner?'}
                    validate={validateYesOrNoIsAnswered}
                    description={
                        <>
                            <Lenke
                                target="_blank"
                                href="https://www.ks.no/fagomrader/helse-og-omsorg/informasjon-om-koronaviruset/samfunnets-kritiske-funksjoner/">
                                Se hele listen over jobbene som faller inn samfunnskritiske funksjoner her
                            </Lenke>
                            .
                        </>
                    }
                />
            </FormBlock>
            <FormBlock>
                {formValues.harSamfunnskritiskJobb === YesOrNo.NO && (
                    <CounsellorPanel>Melding for dem som ikke skal bruke søknaden</CounsellorPanel>
                )}
            </FormBlock>
        </FormikStep>
    );
};


export default ArbeidStep;
