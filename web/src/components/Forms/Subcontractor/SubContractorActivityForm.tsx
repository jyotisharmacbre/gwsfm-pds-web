import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, FormSection } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import Quotes from '../../Tile/Quotes';
import { Validate } from '../../../helpers/fieldValidations';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import IReactIntl from '../../../Translations/IReactIntl';
import { FormattedMessage, injectIntl } from 'react-intl';

interface Props {
  initialValues: any;
}


let SubContractorActivityForm: React.FC<
  Props & IReactIntl & InjectedFormProps<ISubContractorActivity, Props>
> = (props: Props) => {
return (
  <form>
  <div className="row">
      <div className="col-lg-12">
        <div className="forms_wrap">
          <span className="delete_text">DELETE</span>
          <div className="row">
            <div className="col-lg-8">
              <Field
                name="activityName"
                data-test="mainContractor"
                type="text"
                component={PdsFormInput}
                labelKey="LABEL_MAIN_CONTRACTOR"
                placeholderKey="PLACEHOLDER_CONTRACTORS_NAME"
                validate={[
                  Validate.require(props, 'LABEL_MAIN_CONTRACTOR'),
                  Validate.maxLength(props, 1000)
                ]}
                warn={Validate.alphaNumeric(props)}
              />
              <div className="form-group">
                <label>ACtivity Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Eg. Lorem Ipsum"
                />
              </div>
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
                <label htmlFor="exampleInputEmail1">Preferred Supplier</label>
                <div className="js-btn2">
                  <button>YES</button>
                  <button className="active">NO</button>
                </div>
              </div>
              <div className="form-group">
                <label>Total Cost</label>
                <input
                  type="text"
                  className="symbol_fix form-control"
                  placeholder=""
                />
                <span>&#163;</span>
              </div>
              <div className="form-group">
                <label>Gross Margin</label>
                <input
                  type="text"
                  className="symbol_fix form-control"
                  placeholder=""
                />
                <span>%</span>
              </div>
              <div className="form-group">
                <label>Total Sell</label>
                <input
                  type="text"
                  className="symbol_fix form-control"
                  placeholder=""
                />
                <span>&#163;</span>
              </div>
              <div className="form-group">
                <label>Comments</label>
                <textarea
                  className="form-control"
                  style={{ height: 120 }}
                  placeholder="Type in any additional comments"
                ></textarea>
              </div>
            </div>
          </div>
          <Quotes></Quotes>
        </div>
      </div>
    </div>
  </form>
  );
};

const form = reduxForm<ISubContractorActivity, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: 'subContractorActivityForm',
  enableReinitialize: true
})(injectIntl(SubContractorActivityForm));

export default form;

