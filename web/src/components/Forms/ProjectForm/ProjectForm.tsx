import React, { useEffect, useState } from 'react';
import { MainTitle } from '../../Title/Title';

import {
  Field,
  reduxForm,
  InjectedFormProps,
  formValueSelector
} from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import { Validate, alphaNumeric, onlyNumber } from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { getDropdown } from '../../../helpers/utility-helper';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import IReactIntl from '../../../Translations/IReactIntl';
interface Props {
  projectstatus: any;
  onNext: (data: IProjectDetail) => void;
  onSave: (data: IProjectDetail) => void;
  currencies: Array<ICurrency> | null;
  dynamicsContract: any;
  dynamicsCompany: any;
  onSearchContract: (value: any) => void;
  onSearchCompany: (value: any) => void;
  onSearchHOP: (value: any) => void;
  onSearchPO: (value: any) => void;
  onSearchPM: (value: any) => void;
  adHOPData: any;
  adPOData: any;
  adPMData: any;
}

const getCurrencySymbol = (currencies, currencyId) => {
  let symbol = '';
  let filter;
  if (currencies) {
    filter = currencies.find(element => element.currencyId == currencyId);
    if (filter != null && filter != undefined) symbol = filter.currencySymbol;
  }
  return symbol;
};

const ProjectForm: React.FC<
  Props & IReactIntl & InjectedFormProps<IProjectDetail, Props>
> = (props: any) => {
  const {
    handleSubmit,
    projectstatus,
    dynamicsContract,
    dynamicsCompany,
    onSearchContract,
    onSearchCompany,
    onSearchHOP,
    onSearchPO,
    onSearchPM,
    adHOPData,
    adPMData,
    adPOData
  } = props;
  const otherDynamicsContract =
    props.dynamicsOtherContract.length > 0
      ? props.dynamicsOtherContract[0].label
      : '';

  const otherDynamicsCompany =
    props.dynamicsOtherCompany.length > 0
      ? props.dynamicsOtherCompany[0].label
      : '';

  const getDynamicsContractDropdown =
    dynamicsContract &&
    dynamicsContract.map((ContractData: any) => {
      return { label: ContractData.name, id: ContractData.id };
    });

  const getDynamicsCompanyDropdown =
    dynamicsCompany &&
    dynamicsCompany.map((CompanyData: any) => {
      return { label: CompanyData.name, id: CompanyData.id };
    });

  const getADhopDropdown =
    adHOPData &&
    adHOPData.map((HOPData: any) => {
      return { label: HOPData.name, id: HOPData.id };
    });

  const getADpoDropdown =
    adPOData &&
    adPOData.map((POData: any) => {
      return { label: POData.name, id: POData.id };
    });

  const getADpmDropdown =
    adPMData &&
    adPMData.map((PMData: any) => {
      return { label: PMData.name, id: PMData.id };
    });

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
                  className="required"
                  validate={[
                    Validate.required('LABEL_PROJECT'),
                    Validate.maxLength(1000)
                  ]}
                  messageKey="MESSAGE_PROJECT_NAME"
                  labelKey="LABEL_PROJECT"
                  placeholderKey="PLACEHOLDER_PROJECT_NAME"
                />
                <Field
                  name="companyId"
                  type="text"
                  component={PdsFormTypeAhead}                 
                  className="required"
                  validate={[
                    Validate.required('LABEL_COMPANY'),
                    Validate.maxLength(1000)
                  ]}
                  DynamicsType="Company"
                  labelKey="LABEL_COMPANY"
                  placeholder="PLACEHOLDER_COMPANY_NAME"
                  onSearch={onSearchCompany}
                  options={getDynamicsCompanyDropdown}
                  searchText="Searching companies"
                />
                {otherDynamicsCompany === 'Other' && (
                  <Field
                    name="otherCompany"
                    type="text"
                    component={PdsFormInput}
                    className="required"
                    validate={[
                      Validate.required('LABEL_COMPANY'),
                      Validate.maxLength(1000)
                    ]}
                    labelKey="LABEL_OTHER_COMPANY"
                    placeholderKey="PLACEHOLDER_COMPANY_NAME"
                  />
                )}

                <Field
                  name="contractorId"
                  type="text"
                  component={PdsFormTypeAhead}                 
                  className="required"
                  validate={[
                    Validate.required('LABEL_CONTRACT'),
                    Validate.maxLength(1000)
                  ]}
                  messageKey="MESSAGE_CONTRACT_NAME"
                  labelKey="LABEL_CONTRACT"
                  placeholder="PLACEHOLDER_CONTRACT"
                  onSearch={onSearchContract}
                  options={getDynamicsContractDropdown}
                  searchText="Searching contracts"
                  DynamicsType="Contract"
                />

                {otherDynamicsContract === 'Other' && (
                  <Field
                    name="otherContract"
                    type="text"
                    component={PdsFormInput}
                    className="required"
                    validate={[
                      Validate.required('LABEL_CONTRACT'),
                      Validate.maxLength(1000)
                    ]}
                    labelKey="LABEL_OTHER_CONTRACT"
                    placeholderKey="PLACEHOLDER_CONTRACT"
                  />
                )}
                <Field
                  name="headOfProject"
                  type="text"
                  component={PdsFormTypeAhead}                  
                  className="required"
                  validate={[
                    Validate.required('LABEL_HEAD_OF_PROJECT'),
                    Validate.maxLength(1000)
                  ]}
                  labelKey="LABEL_HEAD_OF_PROJECT"
                  placeholder="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
                  onSearch={onSearchHOP}
                  options={getADhopDropdown}
                  searchText="Searching head of project"
                  DynamicsType="HOP"
                  messageKey="MESSAGE_HEAD_OF_PROJECT"
                />

                <Field
                  name="projectOwner"
                  type="text"
                  component={PdsFormTypeAhead}                 
                  placeHolder="Project Owner name"
                  className="required"
                  validate={[
                    Validate.required('LABEL_PROJECT_OWNER'),
                    Validate.maxLength(1000)
                  ]}
                  DynamicsType="PO"
                  messageKey="MESSAGE_PROJECT_OWNER"
                  labelKey="LABEL_PROJECT_OWNER"
                  placeholder="PLACEHOLDER_PROJECT_OWNER_NAME"
                  onSearch={onSearchPO}
                  options={getADpoDropdown}
                  searchText="Searching project owner"
                />

                <Field
                  name="projectManager"
                  type="text"
                  component={PdsFormTypeAhead}                  
                  className="required"
                  validate={[
                    Validate.required('LABEL_PROJECT_MANAGER'),
                    Validate.maxLength(1000)
                  ]}
                  messageKey="MESSAGE_PROJECT_MANAGER"
                  labelKey="LABEL_PROJECT_MANAGER"
                  placeholder="PLACEHOLDER_PROJECT_MANAGER"
                  onSearch={onSearchPM}
                  options={getADpmDropdown}
                  searchText="Searching project manager"
                  DynamicsType="PM"
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
                  className="required"
                  validate={[
                    Validate.required('LABEL_PROJECT_SCOPE'),
                    Validate.maxLength(1040)
                  ]}             
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
                    <FormattedMessage id="LABEL_COUNTRY" />*
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="countryId"
                      component={PdsFormSelect}
                      validate={Validate.required('LABEL_COUNTRY')}
                      placeholderKey="PLACEHOLDER_COUNTRY"
                      messageKey="MESSAGE_COUNTRY"
                    >
                      <FormattedMessage id="PLACEHOLDER_COUNTRY">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Country)}
                    </Field>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CURRENCY" />*
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="currencyId"
                      component={PdsFormSelect}
                      validate={Validate.required('LABEL_CURRENCY')}
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
                  className="width-100 required"
                  validate={[
                    Validate.required('LABEL_PROBABILITY_OF_WINING'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  messageKey="MESSAGE_PROBABILITYOFWINING"
                />

                <Field
                  name="approxValue"
                  type="number"
                  component={PdsFormInput}
                  className="width-120 pl-20 required"
                  validate={[
                    Validate.required('LABEL_APPROXIMATE_VALUE'),
                    Validate.maxLength(1000),
                    onlyNumber
                  ]}
                  currency={getCurrencySymbol(
                    props.currencies,
                    props.currencyId
                  )}
                  divPosition="relative"
                  labelKey="LABEL_APPROXIMATE_VALUE"
                  placeholderKey=""
                  messageKey="MESSAGE_APPROXIMATE_VALUE"
                />

                <div className={'form-group'}>
                  <label>
                    <FormattedMessage id="LABEL_CONTRACT_TYPE" />*
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
                    <FormattedMessage id="LABEL_ASSETS_WORKED_ON" />*
                  </label>
                  <div className="select-wrapper">
                    <Field
                      name="firstAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_FIRST_ASSET"
                      messageKey="MESSAGE_FIRST_ASSET"
                      validate={[
                        Validate.required('LABEL_ASSETS_WORKED_ON'),
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


const mapStateToProps = (state: IState) => ({
  initialValues: state.project.form,
  dynamicsOtherContract: state.dynamicData.dynamicsOtherContract,
  dynamicsOtherCompany: state.dynamicData.dynamicsOtherCompany,
  currencyId: selector(state, 'currencyId')
});

const form = reduxForm<IProjectDetail, Props>({
  form: 'ProjectForm',
  enableReinitialize: true
})(injectIntl(ProjectForm));

const selector = formValueSelector('ProjectForm');

export default connect(mapStateToProps)(form);