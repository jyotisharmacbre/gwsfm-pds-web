import React from 'react';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import { Field } from 'redux-form';

interface IProps {
    riskName: string;
    riskLabelName: string;
    riskControlMeasureName: string;
    riskControlMeasureLabelName: string;
}

const ProjectOverviewRiskForm: React.FC<IProps> = props => {
    return (
        <div className="risk_card card_wrap bg-white">
            <div className="card">
            <h6 className="title">Project Risk</h6>
                <Field
                    name={props.riskName}
                    data-test="riskName"
                    type="text"
                    component={PdsFormInput}
                    labelKey={props.riskLabelName}
                />
                <Field
                    name={props.riskControlMeasureName}
                    data-test="riskControlMeasureName"
                    type="text"
                    component={PdsFormInput}
                    labelKey={props.riskControlMeasureLabelName}
                />
            </div>
        </div>
    );
};
export default ProjectOverviewRiskForm;
