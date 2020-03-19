import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import FormBlock from 'common/components/form-block/FormBlock';
import bemHelper from 'common/utils/bemUtils';
import { commonFieldErrorRenderer } from 'common/utils/commonFieldErrorRenderer';
import intlHelper from 'common/utils/intlUtils';
import { SøknadFormField } from '../../../types/SøknadFormData';
import TypedFormComponents from '../../søknad/typed-form-components/TypedFormComponents';

interface Props {
    onConfirm: () => void;
    onOpenDinePlikterModal: () => void;
    openBehandlingAvPersonopplysningerModal: () => void;
}

const bem = bemHelper('welcomingPage');

const ForenkletSamtykkeForm: React.FunctionComponent<Props> = ({
    onConfirm,
    onOpenDinePlikterModal,
    openBehandlingAvPersonopplysningerModal
}) => {
    const intl = useIntl();
    return (
        <TypedFormComponents.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
            <FormBlock>
                <Lenke
                    target="_blank"
                    href="https://www.ks.no/fagomrader/helse-og-omsorg/informasjon-om-koronaviruset/samfunnets-kritiske-funksjoner/">
                    Se hele listen over jobbene som faller inn samfunnskritiske funksjoner her
                </Lenke>
            </FormBlock>
            <FormBlock>
                <TypedFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'welcomingPage.samtykke.tekst')}
                    name={SøknadFormField.harForståttRettigheterOgPlikter}
                    validate={(value) => {
                        return value !== true
                            ? intlHelper(intl, 'welcomingPage.samtykke.harIkkeGodkjentVilkår')
                            : undefined;
                    }}>
                    <FormattedMessage
                        id="welcomingPage.samtykke.harForståttLabel"
                        values={{
                            plikterLink: (
                                <Lenke href="#" onClick={onOpenDinePlikterModal}>
                                    {intlHelper(intl, 'welcomingPage.samtykke.harForståttLabel.lenketekst')}
                                </Lenke>
                            )
                        }}
                    />
                </TypedFormComponents.ConfirmationCheckbox>
            </FormBlock>

            <FormBlock>
                <Hovedknapp className={bem.element('startApplicationButton')}>
                    {intlHelper(intl, 'welcomingPage.begynnsøknad')}
                </Hovedknapp>
            </FormBlock>
            <FormBlock>
                <div className={bem.element('personopplysningModalLenke')}>
                    <Lenke href="#" onClick={openBehandlingAvPersonopplysningerModal}>
                        <FormattedMessage id="welcomingPage.personopplysninger.lenketekst" />
                    </Lenke>
                </div>
            </FormBlock>
        </TypedFormComponents.Form>
    );
};

export default ForenkletSamtykkeForm;
