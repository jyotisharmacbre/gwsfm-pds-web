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
import {
  Validate,
  alphaNumeric,
  onlyNumber
} from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import { getPropertyName,getDropdown, getFilterElementFromArray, normalizeToNumber } from '../../../helpers/utility-helper';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import IReactIntl from '../../../Translations/IReactIntl';
import TypeAhead from '../../TypeAhead/TypeAhead';
import { dynamicsContract } from '../../TypeAhead/TypeAheadConstantData/dynamicContractData';
import { dynamicsCompany } from '../../TypeAhead/TypeAheadConstantData/dynamicCompanyData';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { any } from 'prop-types';

interface Props {
  projectstatus: any;
  onNext: (data: IProjectDetail) => void;
  onSave: (data: IProjectDetail) => void;
  currencies: Array<ICurrency> | null;
  onSearchContract: (value: any) => void;
  onSearchCompany: (value: any) => void;
  onSearchUserService: (value: any) => void;
  userServiceData: Array<IUserServiceData>;
}

const ProjectForm: React.FC<Props &
  IReactIntl &
  InjectedFormProps<IProjectDetail, Props>> = (props: any) => {
  const {
    handleSubmit,
    projectstatus,
    onSearchContract,
    onSearchCompany,
    onSearchUserService,
    userServiceData
  } = props;

  const otherDynamicsContract =
    props.dynamicsOtherContract.length > 0
      ? props.dynamicsOtherContract[0].label.split(' ')[0]
      : '';

  const otherDynamicsCompany =
    props.dynamicsOtherCompany.length > 0
      ? props.dynamicsOtherCompany[0].label
      : '';

      const getFormattedContractId = (customerId: string) => {
        return (customerId=== '0' ? '' : `(${customerId}), `)
      }
    
      const getFormattedCompanyId = (companyId: string) => {
        return (companyId=== '' ? '' : `(${companyId})`)
      }
    
   const getDynamicsContractDropdown =
      dynamicsContract &&
      dynamicsContract.map((ContractData: any) => {
        return { 
        label: `${ContractData.ContractName}${getFormattedContractId(ContractData.ContractId)}${ContractData.Name === '' ? '' : ContractData.Name}${getFormattedCompanyId(ContractData.CustomerId)}`,
        id: ContractData.ContractId }     
      }); 
    
  const getDynamicsCompanyDropdown =
  dynamicsCompany &&
  dynamicsCompany.map((CompanyData: any) => {
    return { label: CompanyData.Name, id: CompanyData.CompanyId };
  });
  const getUserServiceDropdown =
  userServiceData &&
  userServiceData.filter(user => user.firstname && user.lastName).map((UserServiceData: any) => {
    return { label: UserServiceData.firstname + " " + UserServiceData.lastName,
     id: UserServiceData.id,
      email: UserServiceData.email
    };
  });
  const CurrencyObj = new Currency();
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
                <TypeAhead name="companyId"
                options={getDynamicsCompanyDropdown}
                DynamicsType="companyId"
                onSearch={onSearchCompany}
                placeholderKey="PLACEHOLDER_COMPANY_NAME"
                className="required"
                labelName="LABEL_COMPANY"
                validationKey="LABEL_COMPANY"
                submitParam = "id"/>
                {otherDynamicsCompany === 'Other' && (
                  <Field
                    name="otherCompanyName"
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
                <TypeAhead name="contractorId"
                options={getDynamicsContractDropdown}
                DynamicsType="contractorId"
                onSearch={onSearchContract}
                placeholderKey="PLACEHOLDER_CONTRACT"
                className="required"
                labelName="LABEL_CONTRACT"
                validationKey="LABEL_CONTRACT"
                submitParam = "id"/>

                {otherDynamicsContract === 'Other' && (
                  <Field
                    name="otherContractName"
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

<TypeAhead name="headOfProject"
                options={getUserServiceDropdown}
                DynamicsType="headOfProject"
                onSearch={onSearchUserService}
                placeholderKey="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
                className="required"
                labelName="LABEL_HEAD_OF_PROJECT"
                validationKey="LABEL_HEAD_OF_PROJECT"
                submitParam = "email"/>

<TypeAhead name="projectOwner"
                options={getUserServiceDropdown}
                DynamicsType="projectOwner"
                onSearch={onSearchUserService}
                placeholderKey="PLACEHOLDER_PROJECT_OWNER_NAME"
                className="required"
                labelName="LABEL_PROJECT_OWNER"
                validationKey="LABEL_PROJECT_OWNER"
                submitParam = "email"/>


<TypeAhead name="projectManager"
                options={getUserServiceDropdown}
                DynamicsType="projectManager"
                onSearch={onSearchUserService}
                placeholderKey="PLACEHOLDER_PROJECT_MANAGER"
                className="required"
                labelName="LABEL_PROJECT_MANAGER"
                validationKey="LABEL_PROJECT_MANAGER"
                submitParam = "email"/>

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
                    Validate.maxLength(5000)
                  ]}             
                  labelKey="LABEL_PROJECT_SCOPE"
                />
                <Field
                  name="cnNumber"
                  type="text"
                  component={PdsFormInput}
                  validate={[
                    Validate.maxLength(25)
                  ]}  
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
                      normalize={normalizeToNumber}
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
                  <label><FormattedMessage id='LABEL_TYPE_OF_ENGAGEMENT'></FormattedMessage></label>
                  <div className="select-wrapper">
                    <Field name="engagementId" component={PdsFormSelect} normalize={normalizeToNumber}>                    
                    <FormattedMessage id="PLACEHOLDER_TYPE_OF_ENGAGEMENT">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
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
                      normalize={normalizeToNumber}
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
                              {data.currencyName}
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
                    Validate.maxLength(3),
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
                  currency={getFilterElementFromArray(
                    props.currencies,
                    getPropertyName(
                    CurrencyObj,
                    prop => prop.currencyId
                  ),
                    props.currencyId,
                    getPropertyName(
                    CurrencyObj,
                    prop => prop.currencySymbol
                  )
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
                      validate={Validate.required('LABEL_CONTRACT_TYPE')}
                      placeholderKey="PLACEHOLDER_CONTRACT_TYPE"
                      messageKey="MESSAGE_CONTRACT_TYPE"
                      normalize={normalizeToNumber}
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
                  <div className="select-wrapper mb-2">
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
                      normalize={normalizeToNumber}
                    >
                      <FormattedMessage id="PLACEHOLDER_FIRST_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      >{getDropdown(props.projectstatus, LookupType.Asset)}
                    </Field>
                  </div>

                  <div className="select-wrapper mb-2">
                    <Field
                      name="secondAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_SECOND_ASSET"
                      normalize={normalizeToNumber}
                    >
                      <FormattedMessage id="PLACEHOLDER_SECOND_ASSET">
                        {message => <option value="">{message}</option>}
                      </FormattedMessage>
                      {getDropdown(props.projectstatus, LookupType.Asset)}
                    </Field>
                  </div>

                  <div className="select-wrapper mb-2">
                    <Field
                      name="thirdAssetWorkedOn"
                      component={PdsFormSelect}
                      DropdownCheck="selectRound"
                      placeholderKey="PLACEHOLDER_THIRD_ASSET"
                      normalize={normalizeToNumber}
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
            <div className="hr_line mb-0 mt-4"></div>
            <div className="mr-35 two-side-btn">
              <button
                className="active ml-auto"
                type="button"
                name="saveAndClose"
                onClick={handleSubmit(values => props.onSave(values))}
              >
                <FormattedMessage id="BUTTON_SAVE_AND_CLOSE" />
              </button>
              <button
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
