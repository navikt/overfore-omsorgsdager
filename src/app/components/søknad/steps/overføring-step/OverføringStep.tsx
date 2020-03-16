import * as React from 'react';
import { StepConfigProps, StepID } from '../../../../config/stepConfig';
import FormikStep from '../../formik-step/FormikStep';

const OverføringStep = ({ onValidSubmit }: StepConfigProps) => {
    return (
        <FormikStep id={StepID.OVERFØRING} onValidFormSubmit={onValidSubmit}>
            Skjema legges inn her
        </FormikStep>
    );
};

export default OverføringStep;
