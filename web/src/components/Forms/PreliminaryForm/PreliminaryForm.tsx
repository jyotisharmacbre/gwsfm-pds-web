import React from 'react';
// import { Col } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormRadio from '../../PdsFormHandlers/PdsFormRadio';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import DatePicker from '../../DatePicker';
import { selectionButtons } from '../../../helpers/constants';
import { enquiryTypeData } from '../../../helpers/dropDownFormValues';
import { IState } from '../../../store/state';
import { IProjectAdditionalDetail } from '../../../store/ProjectOverviewForm/Types/IProjectAdditionalDetail';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { getPropertyName, getDropdown } from '../../../helpers/utility-helper';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import EventType from '../../../enums/EventType';
import {
  projectStatusData,
  engagementData
} from '../../../helpers/dropDownFormValues';
import {
  alphaNumeric,
  onlyNumber,
  Validate
} from '../../../helpers/fieldValidations';
import { FormattedMessage } from 'react-intl';
import { IPreliminariesItemDetails } from '../../../store/Preliminaries/Types/IPreliminariesItemDetails';
import { IPreliminaryForm } from '../../../store/Preliminaries/Types/IPreliminaryState';
import PreliminaryComponentForm from './PreliminaryComponentForm';
interface Props {
  onSave: (
    projectId: string,
    componentId: IPreliminariesComponentDetails,
    saveAll:boolean
  ) => void;
  preliminariesDetails: any;
}

let PreliminaryForm: React.FC<
  Props & InjectedFormProps<IPreliminaryForm, Props>
> = (props: any) => {
  const {initialValues } = props;
  return (
    <form
            className="project-overview-form"
            noValidate={true}
            data-test="projectOverviewForm"
          >
    <div id="accordion">
      {props.initialValues.preliminaryDetails.map(function(componentData:IPreliminariesComponentDetails, componentkey) {
        return (
          <PreliminaryComponentForm 
          key={componentkey}
          form={`preliminaryComp_${componentkey}`}
          initialValues={componentData}
          componentName={componentData.componentName}
          componentId={componentData.componentId}
          isVisible={props.isVisible}>
          </PreliminaryComponentForm>
        );
      })}
    </div>
    </form>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.preliminary,
});

const form = reduxForm<IPreliminaryForm, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'PreliminaryForm',
  enableReinitialize: true
})(PreliminaryForm);

export default connect(mapStateToProps)(form);
