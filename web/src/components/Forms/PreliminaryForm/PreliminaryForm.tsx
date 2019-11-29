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

interface Props {
  onSave: (
    projectId: string,
    preliminaryDetails: IPreliminariesComponentDetails
  ) => void;
  preliminariesDetails: any;
}

let PreliminaryForm: React.FC<
  Props & InjectedFormProps<Array<IPreliminariesComponentDetails>, Props>
> = (props: any) => {
  const { handleSubmit, initialValues } = props;
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
    <div id="accordion">
      {props.initialValues.map(function(componentData, componentkey) {
        return (
          <div key={componentkey} className="card">
            <div
              className="card-header"
              data-toggle="collapse"
              onClick={() => handleCollapseEvent(componentData.componentId)}
            >
              <a className="card-link">{componentData.componentName}</a>
              <span className="fas fa-angle-up" aria-hidden="true"></span>
            </div>
            <div
              id={'collapse_' + componentData.componentId}
              className="hide"
              data-parent="#accordion"
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Name of Supplier</th>
                        <th>No of Hours</th>
                        <th>Hour Rate</th>
                        <th>Total Cost</th>
                        <th>Gross Margin</th>
                        <th>Total Sell</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentData.items.map(function(itemData, itemKey) {
                        return (
                          <tr>
                            <td>{itemData.itemName}</td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                            <td>
                              <input type="text" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="text-right">
                  <button type="submit" className="text-right btn-sm">
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.preliminary.preliminaryDetails
});

const form = reduxForm<Array<IPreliminariesComponentDetails>, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'PreliminaryForm',
  enableReinitialize: true
})(PreliminaryForm);

export default connect(mapStateToProps)(form);
