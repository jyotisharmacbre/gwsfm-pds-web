import React, { useEffect } from 'react';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import {
  alphaNumeric,
  onlyNumber,
  Validate
} from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { getDropdown } from '../../../helpers/utility-helper';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';

interface Props {
  projectstatus: any;
  onNext: (data: IProjectDetail) => void;
  onSave: (data: IProjectDetail) => void;
  currencies: Array<ICurrency> | null;
}

const getCurrencySymbol = (currencies,currencyId) => {
  let symbol = '';
  let filter;
if(currencies){
  filter = currencies.find(element=>element.currencyId == currencyId);
  if(filter != null && filter != undefined)
    symbol = filter.currencySymbol;
}
return symbol;
}

const ProjectForm: React.FC<
  Props & InjectedFormProps<IProjectDetail, Props>
> = (props: any) => {
  const { handleSubmit, projectstatus } = props;

  return (
    <div className="container-fluid">
      <div className=" row">
        <div className="col-lg-12 col-sm-12">
          <form className="customer-enquiry" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8">
                <MainTitle>
                  <FormattedMessage id="HEADING_CUSTOMER_ENQUIRY" />
                </MainTitle>
                <Field
                  name="name"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_NAME"
                  labelKey="LABEL_PROJECT"
                  placeholderKey="PLACEHOLDER_PROJECT_NAME"
                />
                <Field
                  name="companyId"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Company name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_COMPANY"
                  placeholderKey="PLACEHOLDER_COMPANY_NAME"
                />
                <Field
                  name="contractorId"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Contract name'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_CONTRACT_NAME"
                  labelKey="LABEL_CONTRACT"
                  placeholderKey="PLACEHOLDER_CONTRACT"
                />
                <Field
                  name="headOfProject"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Head of project'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_HEAD_OF_PROJECT"
                  labelKey="LABEL_HEAD_OF_PROJECT"
                  placeholderKey="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
                />
                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormInput}
                  placeHolder="Project Owner name"
                  validate={[
                    Validate.required('Project owner'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_OWNER"
                  labelKey="LABEL_PROJECT_OWNER"
                  placeholderKey="PLACEHOLDER_PROJECT_OWNER_NAME"
                />
                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.required('Project manager'),
                    Validate.maxLength(1000)
                  ]}
                  warn={alphaNumeric}
                  messageKey="MESSAGE_PROJECT_MANAGER"
                  labelKey="LABEL_PROJECT_MANAGER"
                  placeholderKey="PLACEHOLDER_PROJECT_MANAGER"
                />

                <Field
                  name="pmHasExperience"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_PROJECT_MANAGER_EXPERIENCEN"
                />

                <Field
                  name="scope"
                  rows="7"
                  component={PdsFormTextArea}
                  validate={[
                    Validate.required('Project scope'),
                    Validate.maxLength(1040)
                  ]}
                  warn={alphaNumeric}
                  labelKey="LABEL_PROJECT_SCOPE"
                />
                <Field
                  name="cnNumber"
                  type="number"
                  component={PdsFormInput}
                  validate={onlyNumber}
                  labelKey="LABEL_CN_NUMBER"
                  placeholderKey="PLACEHOLDER_CN_NUMBER"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_PROJECT_STATUS" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="status"
                      component={PdsFormSelect}
                      placeHolder="Select status"
                    >
                      <FormattedMessage id="PLACEHOLDER_PROJECT_STATUS">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(
                        props.projectstatus,
                        LookupType.Project_Status
                      )}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>Type of engagement</label>
                  <div className="select-wrapper">
                    <Field name="engagementId" component={PdsFormSelect}>
                      <option value="">Select type of engagement</option>
                      {getDropdown(
                        props.projectstatus,
                        LookupType.Engagement_Type
                      )}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_COUNTRY" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="countryId"
                      component={PdsFormSelect}
                      validate={[Validate.required('Project name')]}
                      placeholderKey="PLACEHOLDER_COUNTRY"
                      messageKey="MESSAGE_COUNTRY"
                    >
                      <FormattedMessage id="PLACEHOLDER_COUNTRY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(
                        props.projectstatus,
                        LookupType.Engagement_Type
                      )}
                      {getDropdown(props.projectstatus, LookupType.Country)}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CURRENCY" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="currencyId"
                      component={PdsFormSelect}
                      validate={Validate.required('Currency')}
                      placeholderKey="PLACEHOLDER_CURRENCY"
                      messageKey="MESSAGE_CURRENCY"
                    >
                      <FormattedMessage id="PLACEHOLDER_CURRENCY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {props.currencies &&
                        props.currencies.map((data: ICurrency, i: number) => {
                          return (
                            <option
                              key={data.currencyId}
                              value={data.currencyId}
                            >
                              {data.currencySymbol}
                            </option>
                          );
                        })}
                    </Field>
                  </div>
                </div>

                <Field
                  name="probabilityOfWinning"
                  type="number"
                  component={PdsFormInput}
                  labelKey="LABEL_PROBABILITY_OF_WINING"
                  placeholderKey="PLACEHOLDER_WIN_PROBABILITY"
                  className="width-100"
                  validate={[
                    Validate.required('Probability of wining'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  messageKey="MESSAGE_PROBABILITYOFWINING"
                />

                <Field
                  name="approxValue"
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20"
                  validate={[
                    Validate.required('Approximate value'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency={getCurrencySymbol(props.currencies,props.currencyId)}
                  divPosition="relative"
                  labelKey="LABEL_APPROXIMATE_VALUE"
                  placeholderKey=""
                  messageKey="MESSAGE_APPROXIMATE_VALUE"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CONTRACT_TYPE" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="contractTypeId"
                      component={PdsFormSelect}
                      validate={Validate.required('Contract type')}
                      placeholderKey="PLACEHOLDER_CONTRACT_TYPE"
                      messageKey="MESSAGE_CONTRACT_TYPE"
                    >
                      <FormattedMessage id="PLACEHOLDER_CONTRACT_TYPE">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(
                        props.projectstatus,
                        LookupType.Contract_Type
                      )}
                    </Field>
                  </div>
                </div>

                <Field
                  name="cdmNotifiable"
                  component={PdsFormButton}
                  buttons={selectionButtons}
                  labelKey="LABEL_CDMNOTIFIABLE"
                />
                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_ASSETS_WORKED_ON" />
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="firstAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_FIRST_ASSET"
                      messageKey="MESSAGE_FIRST_ASSET"
                      validate={[
                        Validate.required('Asset'),
                        Validate.maxLength(1000),
                        onlyNumber
                      ]}
                    >
                      <FormattedMessage id="PLACEHOLDER_FIRST_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      >{getDropdown(props.projectstatus, LookupType.Asset)}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="secondAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_SECOND_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_SECOND_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Asset)}
                    </Field>
                  </div>

                  <div className="select-wrapper">
                    <Field
                      name="thirdAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_THIRD_ASSET"
                    >
                      <FormattedMessage id="PLACEHOLDER_THIRD_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Asset)}
                    </Field>
                  </div>
                </div>

                <Field
                  labelKey="LABEL_COMMENTS"
                  name="comment"
                  rows="7"
                  component={PdsFormTextArea}
                  placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
                />
              </div>
            </div>
            <div className="mr-35 d-flex justify-content-between mb-4">
              <button
                className="active mb-4 mt-5"
                type="button"
                onClick={handleSubmit(values => props.onSave(values))}
              >
                <FormattedMessage id="BUTTON_SAVE_AND_CLOSE" />
              </button>

              <button
                className="active mb-4 mt-5"
                type="button"
                name="next"
                onClick={handleSubmit(values => props.onNext(values))}
              >
                <FormattedMessage id="BUTTON_NEXT" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const form = reduxForm<IProjectDetail, Props>({
  form: 'ProjectForm',
  enableReinitialize: true
})(ProjectForm);

const selector = formValueSelector('ProjectForm');


const mapStateToProps = (state: IState) => ({
  initialValues: state.project.form,
  currencyId:selector(state, 'currencyId')
});

export default connect(mapStateToProps)(form);
