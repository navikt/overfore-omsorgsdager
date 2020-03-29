import * as React from 'react';
import { useIntl } from 'react-intl';
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
    validateUtenlandsoppholdNeste12Mnd, validateUtenlandsoppholdSiste12Mnd
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
                Medlemskap i folketrygden er nøkkelen til rettigheter fra NAV. Hvis du bor eller jobber i Norge er du
                vanligvis medlem. Du kan lese mer om medlemskap på{' '}
                <Lenke href={getLenker().medlemskap} target="_blank">
                    nav.no
                </Lenke>
                .
            </CounsellorPanel>
            <FormBlock margin="xxl">
                <ApplicationFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.spm')}
                    name={ApplicationFormField.harBoddUtenforNorgeSiste12Mnd}
                    validate={validateYesOrNoIsAnswered}
                    info={intlHelper(intl, 'steg.medlemsskap.annetLandSiste12.hjelp')}
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
                            addLabel: 'Legg til nytt utenlandsopphold',
                            modalTitle: 'Utenlandsopphold siste 12 måneder'
                        }}
                    />
                </FormBlock>
            )}
            <FormBlock>
                <ApplicationFormComponents.YesOrNoQuestion
                    legend={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.spm')}
                    name={ApplicationFormField.skalBoUtenforNorgeNeste12Mnd}
                    validate={validateYesOrNoIsAnswered}
                    info={intlHelper(intl, 'steg.medlemsskap.annetLandNeste12.hjelp')}
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
                            addLabel: 'Legg til nytt utenlandsopphold',
                            modalTitle: 'Utenlandsopphold neste 12 måneder'
                        }}
                    />
                </FormBlock>
            )}
        </ApplicationStep>
    );
};

export default MedlemsskapStep;
