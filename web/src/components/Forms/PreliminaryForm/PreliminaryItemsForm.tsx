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
import { IPreliminariesItems } from '../../../store/Preliminaries/Types/IPreliminariesItems';

interface Props {
    initialValues:IPreliminariesItemDetails;
 }

let PreliminaryItemsForm: React.FC<
  Props & InjectedFormProps<IPreliminariesItemDetails, Props>
> = (props: any) => {
  return (
    <form>
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
                          <tr>
                            <td>{props.initialValues.itemName}</td>
                            <td>
                              <Field
                  name="nameOfSupplier"
                  data-test="noOfHours"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                            <td>
                            <Field
                  name="noOfHours"
                  data-test="noOfHours"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                            <td>
                            <Field
                  name="hourRate"
                  data-test="hourRate"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                            <td>
                            <Field
                  name="totalCost"
                  data-test="totalCost"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                            <td>
                            <Field
                  name="grossMargin"
                  data-test="grossMargin"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                            <td>
                              <input type="text"  readOnly={true} />
                            </td>
                            <td>
                            <Field
                  name="comments"
                  data-test="comments"
                  type="text"
                  component={PdsFormInput}
                  className="required"
                />
                            </td>
                          </tr>
                     
                    </tbody>
                  </table>
                </div>
              
              </div>
    </form>
  );
};


const form = reduxForm<IPreliminariesItemDetails, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  enableReinitialize: true
})(PreliminaryItemsForm);

export default form;
