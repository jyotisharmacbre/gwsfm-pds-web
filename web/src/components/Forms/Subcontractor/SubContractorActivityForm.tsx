import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, FormSection } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import Quotes from '../../Tile/Quotes';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import IReactIntl from '../../../Translations/IReactIntl';
import { FormattedMessage, injectIntl } from 'react-intl';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';

interface Props {
  index:number;
  initialValues: ISubContractorActivity;
  totalCount:number;
  deleteActivity: (index:number) => void;
}  

let SubContractorActivityForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractorActivity, Props>
> = (props: Props) => {
return (
  <form>
  <div className="row">
      <div className="col-lg-12">
        <div className="forms_wrap">
        {props.totalCount > 1? 
          <span className="delete_text" onClick={()=>props.deleteActivity(props.index)}>
              DELETE
              <FontAwesomeIcon className="" icon={faTrash} />
            </span> : null 
        }
            <div className="row">
              <div className="col-lg-7">
                <form className="custom-wrap p-0">
                <Field
                name="activityName"
                data-test="mainContractor"
                type="text"
                component={PdsFormInput}
                validate={[
                    Validate.required('LABEL_PROJECT'),
                    Validate.maxLength(1000)
                  ]}
                messageKey="MESSAGE_PROJECT_NAME"
                labelKey="LABEL_ACTIVITY_NAME"
                placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
              />
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Existing Subcontractor
                    </label>
                    <div className="js-btn2">
                      <button>YES</button>
                      <button className="active">NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subcontractor</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Subcontractor's Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Preferred Supplier
                    </label>
                    <div className="js-btn2">
                      <button>YES</button>
                      <button className="active">NO</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Total Cost</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                  </div>
                  <div className="form-group">
                    <label>Gross Margin</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">%</span>
                  </div>
                  <div className="form-group">
                    <label>Total Sell</label>
                    <input
                      type="text"
                      className="form-control width-250"
                      placeholder=""
                    />
                    <span className="symbol_fix">&#163;</span>
                  </div>
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea
                      className="form-control"
                      style={{ height: 120 }}
                      placeholder="Type in any additional comments"
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Quotes></Quotes>
        </div>
      </div>
  </form>
  );
};

const form = reduxForm<ISubContractorActivity, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  enableReinitialize: true
})(injectIntl(SubContractorActivityForm));

export default form;

