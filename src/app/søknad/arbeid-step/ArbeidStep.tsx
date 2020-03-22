import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormikCheckboxPanelGroup, YesOrNo } from '@navikt/sif-common-formik/lib';
import { useFormikContext } from 'formik';
import Lenke from 'nav-frontend-lenker';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import FormBlock from 'common/components/form-block/FormBlock';
import intlHelper from 'common/utils/intlUtils';
import { validateYesOrNoIsAnswered } from 'common/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { Arbeidssituasjon, SøknadFormData, SøknadFormField } from '../../types/SøknadFormData';
import { validateArbeid } from '../../validation/fieldValidations';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadStep from '../SøknadStep';

const ArbeidStep = ({ onValidSubmit }: StepConfigProps) => {
    const { values: formValues } = useFormikContext<SøknadFormData>();
    const intl = useIntl();
    return (
        <SøknadStep
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
                <SøknadFormComponents.YesOrNoQuestion
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
                    <CounsellorPanel>
                        <FormattedMessage id="introPage.counsellor" />
                        <br />
                        <Lenke
                            target="_blank"
                            href="https://www.ks.no/fagomrader/helse-og-omsorg/informasjon-om-koronaviruset/samfunnets-kritiske-funksjoner/">
                            FIXME: Les om andre muligheter for å dele omsorgsdagene dine
                        </Lenke>
                    </CounsellorPanel>
                )}
            </FormBlock>
        </SøknadStep>
    );
};

export default ArbeidStep;
