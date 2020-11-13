import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { validateYesOrNoIsAnswered } from '@navikt/sif-common-core/lib/validation/fieldValidations';
import { useFormikContext } from 'formik';
import Lenke from 'nav-frontend-lenker';
import CounsellorPanel from 'common/components/counsellor-panel/CounsellorPanel';
import FormBlock from 'common/components/form-block/FormBlock';
import BostedUtlandListAndDialog from 'common/forms/bosted-utland/BostedUtlandListAndDialog';
import { YesOrNo } from 'common/types/YesOrNo';
import { date1YearAgo, date1YearFromNow, dateToday } from 'common/utils/dateUtils';
import intlHelper from 'common/utils/intlUtils';
import {
    validateUtenlandsoppholdNeste12Mnd,
    validateUtenlandsoppholdSiste12Mnd,
} from 'app/validation/fieldValidations';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import getLenker from '../../lenker';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const MedlemsskapStep: React.FunctionComponent<StepConfigProps> = ({ onValidSubmit }) => {
    const { values } = useFormikContext<ApplicationFormData>();
    const intl = useIntl();
    return (
        <ApplicationStep id={StepID.MEDLEMSKAP} onValidFormSubmit={onValidSubmit}>
            <CounsellorPanel>
                <FormattedMessage id="steg.medlemsskap.veilder.textFørLenke" />{' '}
                <Lenke href={getLenker().medlemskap} target="_blank">
                    <FormattedMessage id="steg.medlemsskap.veilder.lenketekst.nav.no" />
                </Lenke>
                .
            </CounsellorPanel>
            <FormBlock margin="xxl">
                <ApplicationFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.spm')}
                    name={ApplicationFormField.harBoddUtenforNorgeSiste12Mnd}
                    validate={validateYesOrNoIsAnswered}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'expandableInfo.hvaBetyrDette')}>
                            {intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.hjelp')}
                        </ExpandableInfo>
                    }
                />
            </FormBlock>
            {values.harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES && (
                <FormBlock margin="l">
                    <BostedUtlandListAndDialog<ApplicationFormField>
                        name={ApplicationFormField.utenlandsoppholdSiste12Mnd}
                        minDate={date1YearAgo}
                        maxDate={dateToday}
                        validate={validateUtenlandsoppholdSiste12Mnd}
                        labels={{
                            addLabel: intlHelper(intl, 'steg.medlemsskap.opphold.addLabel'),
                            modalTitle: intlHelper(intl, 'steg.medlemsskap.oppholdSiste12.modalTitle'),
                        }}
                    />
                </FormBlock>
            )}
            <FormBlock>
                <ApplicationFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.spm')}
                    name={ApplicationFormField.skalBoUtenforNorgeNeste12Mnd}
                    validate={validateYesOrNoIsAnswered}
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'expandableInfo.hvaBetyrDette')}>
                            {intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.hjelp')}
                        </ExpandableInfo>
                    }
                />
            </FormBlock>
            {values.skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES && (
                <FormBlock margin="l">
                    <BostedUtlandListAndDialog<ApplicationFormField>
                        minDate={dateToday}
                        maxDate={date1YearFromNow}
                        name={ApplicationFormField.utenlandsoppholdNeste12Mnd}
                        validate={validateUtenlandsoppholdNeste12Mnd}
                        labels={{
                            addLabel: intlHelper(intl, 'steg.medlemsskap.opphold.addLabel'),
                            modalTitle: intlHelper(intl, 'steg.medlemsskap.oppholdNeste12.modalTitle'),
                        }}
                    />
                </FormBlock>
            )}
        </ApplicationStep>
    );
};

export default MedlemsskapStep;
