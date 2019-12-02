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
import PreliminaryItemsForm from "./PreliminaryItemsForm"
interface Props {
    initialValues:IPreliminariesComponentDetails;
    componentName:string,
    componentId:string,
    isVisible:boolean
 }

let PreliminaryComponentForm: React.FC<
  Props & InjectedFormProps<IPreliminariesComponentDetails, Props>
> = (props: any) => {
  const handleCollapseEvent = (id: string) => {
    var element: any = document.getElementById('collapse_' + id);
    var isClassExists = element.classList.contains('show');
    if (isClassExists) {
      element.classList.add('hide');
      element.classList.remove('show');
    } else {
      element.classList.remove('hide');
      element.classList.add('show');
    }
  };
  return (
    <form>
            <div id="accordion">
      
          <div className="card">
            <div
              className="card-header"
              data-toggle="collapse"
              onClick={() => handleCollapseEvent(props.componentId)}
            >
              <a className="card-link" >{props.componentName}</a>
              <span className="fas fa-angle-up" aria-hidden="true"></span>
            </div>
            <div
              id={'collapse_' + props.componentId}
              className="hide expandAll"
              data-parent="#accordion"
            >
              
              {props.initialValues.items.map(function(itemData, itemKey) {
        return (
          <PreliminaryItemsForm 
          key={itemKey}
          form={`preliminaryItem_${itemKey}`}
          initialValues={itemData}>

          </PreliminaryItemsForm>
        );
      })}
        <div className="text-right" >
                  <button type="submit" className="text-right btn-sm">
                    SAVE
                  </button>
                </div>
             
            </div>
          </div>
        
      
    </div>
    </form>
  );
};


const form = reduxForm<IPreliminariesComponentDetails, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  enableReinitialize: true
})(PreliminaryComponentForm);

export default form;
