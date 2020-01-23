import React from 'react';
import { MainTitle } from '../../Title/Title';

import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormSelect from '../../PdsFormHandlers/PdsFormSelect';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import PdsFormButton from '../../PdsFormHandlers/PdsFormButton';
import { selectionButtons } from '../../../helpers/constants';
import { Validate, alphaNumeric, onlyNumber, OnlyDistinctAssetTypes } from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import {
	getPropertyName,
	getDropdown,
	getFilterElementFromArray,
	normalizeToNumber,
	calculateRank,
	maxLimitTo,
	restrictMinusAndAllowDecimal,
	restrictMinusAndDecimal,
	restrictMinusAndAllowDecimalForMaxRangeHundred
} from '../../../helpers/utility-helper';
import PdsFormTypeAhead from '../../PdsFormHandlers/PdsFormTypeAhead';
import { IProjectDetail } from '../../../store/CustomerEnquiryForm/Types/IProjectDetail';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import IReactIntl from '../../../Translations/IReactIntl';
import TypeAhead from '../../TypeAhead/TypeAhead';
import NewTypeAhead from '../../TypeAhead/NewTypeAhead';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { any } from 'prop-types';
import { IDynamicContractCustomerData, IDynamicCompanyData, IDynamicsDivision, IDynamicBusinessUnits } from '../../../store/DynamicsData/Types/IDynamicData';
import { ICountry } from '../../../store/Lookups/Types/ICountry';
import ValidatedNumericInput from '../../NumericInput';
import { change } from "redux-form";

interface Props {
	projectstatus: any;
	onNext: (data: IProjectDetail) => void;
	onSave: (data: IProjectDetail) => void;
	currencies: Array<ICurrency> | null;
	onSearchContract: (value: any) => void;
	onSearchCompany: (value: any) => void;
	getListOfUsers: (value: any) => void;
	getListOfCompanies: (value: any) => void;
	getListOfContract: (value: any) => void;
	userServiceData: Array<IUserServiceData>;
	dynamicsContractCustomerData: Array<IDynamicContractCustomerData>;
	dynamicsCompany: Array<IDynamicCompanyData>;
	countries: Array<ICountry> | null;
	listOfDivisions: Array<IDynamicsDivision>;
	listOfBusinessUnits:Array<IDynamicBusinessUnits>;
}

const ProjectForm: React.FC<Props & InjectedFormProps<IProjectDetail, Props>> = (props: any) => {
	const {
		handleSubmit,
		projectstatus,
		onSearchContract,
		onSearchCompany,
		userServiceData,
		dynamicsContractCustomerData,
		dynamicsCompany,
		listOfDivisions
	} = props;

	const onCountryChange = (event) => {
		if (props.countries && props.currencies) {
			const selectedCountryId = Number(event.target.value);
			const selectedCurrencyId = props.countries.find(x => x.countryId === selectedCountryId)?.currencyId;
			props.currencies.find(x => x.currencyId === selectedCurrencyId) && props.changeCurrencyId(selectedCurrencyId);
		}
	}

	const otherDynamicsContract = props.dynamicsOtherContract.length > 0 ? props.dynamicsOtherContract[0].id : '';

	const otherDynamicsCompany = props.dynamicsOtherCompany.length > 0 ? props.dynamicsOtherCompany[0].id : '';

	const getFormattedCustomerId = (customerId: string) => {
		return customerId === '' ? '' : `- ${customerId}`;
	};

	const getFormattedCustomer = (customerName: string, customerId: string) => {
		return `${customerName === '' ? '' : `${customerName}`} ${getFormattedCustomerId(customerId)}`;
	};

	const getFormattedContractId = (contractId: string) => {
		return contractId === '0' ? '' : `- ${contractId})`;
	};

	const getFormattedContract = (contractName: string, contractId: string) => {
		return `${contractName === 'Other' ? `${contractName}` : `(${contractName}`} 
    ${getFormattedContractId(contractId)}`;
	};

	const getDynamicsContractDropdown =
		dynamicsContractCustomerData &&
		dynamicsContractCustomerData.map((ContractData: any) => {
			return {
				label: ((ContractData.customerName === '' ? '' : ContractData.customerName) +
					(ContractData.customerId === '' ? '' : '-' + ContractData.customerId) +
					(ContractData.contractName === 'Other'
						? ContractData.contractName
						: '(' +
						ContractData.contractName +
						(ContractData.contractId === '0' ? '' : '-' + ContractData.contractId + ')'))).trim(),
				id: ContractData.contractId
			};
		});

	const getDynamicsCompanyDropdown =
		dynamicsCompany &&
		dynamicsCompany.map((CompanyData: any) => {
			return { label: CompanyData.name, id: CompanyData.companyId };
		});

	const formatCompanyForTypeAhead = (data) => {
		let result: any = [];
		data.map((CompanyData: any) => {
			result.push({ label: CompanyData.name, id: CompanyData.companyId });
		});
		return result;
	};

	const formatContractForTypeAhead = (data) => {
		let result: any = [];
		data.map((ContractData: any) => {
			result.push({
				label: ((ContractData.customerName === '' ? '' : ContractData.customerName) +
					(ContractData.customerId === '' ? '' : '-' + ContractData.customerId) +
					(ContractData.contractName === 'Other'
						? ContractData.contractName
						: '(' +
						ContractData.contractName +
						(ContractData.contractId === '0' ? '' : '-' + ContractData.contractId + ')'))).trim(),
				id: ContractData.contractId
			});
		});
		return result;
	};

	const getUserServiceDropdown =
		userServiceData &&
		userServiceData.filter((user) => user.firstname && user.lastName).map((UserServiceData: any) => {
			return {
				label: `${UserServiceData.firstname} ${UserServiceData.lastName} (${UserServiceData.email === null
					? 'NA'
					: UserServiceData.email})`,
				id: UserServiceData.id,
				email: UserServiceData.email
			};
		});

	const formatUserForTypeAhead = (data) => {
		let result: any = [];
		data.map((UserServiceData: any) => {
			result.push({
				label: `${UserServiceData.firstname} ${UserServiceData.lastName} (${UserServiceData.email === null
					? 'NA'
					: UserServiceData.email})`,
				id: UserServiceData.id,
				email: UserServiceData.email
			});
		});
		return result;
	};
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
									validate={/*To do: Have to replace it with consistent solution.
                      Currently, This field is using "require"(no memoize) insted of "required"(with memoize),
                      It is in use to change the state of "required" error message on language change*/
										[Validate.required('LABEL_PROJECT'), Validate.maxLength(1000)]}
									messageKey="MESSAGE_PROJECT_NAME"
									labelKey="LABEL_PROJECT"
									placeholderKey="PLACEHOLDER_PROJECT_NAME"
								/>

								<div className={'form-group'}>
									<label>
										<FormattedMessage id="LABEL_DIVISION" />
									</label>
									<div className="select-wrapper">
										<Field name="divisionId" component={PdsFormSelect}>
											<FormattedMessage id="PLACEHOLDER_DIVISION">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>

											{props.listOfDivisions &&
												props.listOfDivisions.map((data: any, i: number) => {
													return <option value={data.divisionId}>{data.description}</option>;
												})}
										</Field>
									</div>
								</div>

								<div className={'form-group'}>
									<label>
										<FormattedMessage id="LABEL_BUSINESS_UNIT" />
									</label>
									<div className="select-wrapper">
										<Field name="businessUnitId" component={PdsFormSelect}>
											<FormattedMessage id="PLACEHOLDER_BUSINESS_UNIT">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{props.listOfBusinessUnits &&
												props.listOfBusinessUnits.map((data: any, i: number) => {
													return (
														<option value={data.businessUnitId}>{data.description}</option>
													);
												})}
										</Field>
									</div>
								</div>
								<NewTypeAhead
									name="companyId"
									onSearch={props.getListOfCompanies}
									formatData={formatCompanyForTypeAhead}
									DynamicsType="companyId"
									placeholderKey="PLACEHOLDER_COMPANY_NAME"
									className="required"
									labelName="LABEL_COMPANY"
									validationKey="LABEL_COMPANY"
									submitParam="id"
								/>
								{props.companyId === '0' && (
									<Field
										name="otherCompanyName"
										type="text"
										component={PdsFormInput}
										className="required"
										validate={[Validate.required('LABEL_COMPANY'), Validate.maxLength(1000)]}
										labelKey="LABEL_OTHER_COMPANY"
										placeholderKey="PLACEHOLDER_COMPANY_NAME"
									/>
								)}
								<NewTypeAhead
									name="contractorId"
									onSearch={props.getListOfContract}
									formatData={formatContractForTypeAhead}
									DynamicsType="contractorId"
									placeholderKey="PLACEHOLDER_CONTRACT"
									className="required"
									labelName="LABEL_CONTRACT"
									validationKey="LABEL_CONTRACT"
									submitParam="id"
								/>
								{props.contractorId === '0' && (
									<Field
										name="otherContractName"
										type="text"
										component={PdsFormInput}
										className="required"
										validate={[Validate.required('LABEL_CONTRACT'), Validate.maxLength(1000)]}
										labelKey="LABEL_OTHER_CONTRACT"
										placeholderKey="PLACEHOLDER_CONTRACT"
									/>
								)}
								<NewTypeAhead
									name="headOfProject"
									onSearch={props.getListOfUsers}
									formatData={formatUserForTypeAhead}
									DynamicsType="headOfProject"
									placeholderKey="PLACEHOLDER_HEAD_OF_PROJECT_NAME"
									className="required"
									labelName="LABEL_HEAD_OF_PROJECT"
									validationKey="LABEL_HEAD_OF_PROJECT"
									submitParam="email"
								/>
								<NewTypeAhead
									name="projectOwner"
									onSearch={props.getListOfUsers}
									formatData={formatUserForTypeAhead}
									DynamicsType="projectOwner"
									placeholderKey="PLACEHOLDER_PROJECT_OWNER_NAME"
									className="required"
									labelName="LABEL_PROJECT_OWNER"
									validationKey="LABEL_PROJECT_OWNER"
									submitParam="email"
								/>
								<NewTypeAhead
									name="projectManager"
									onSearch={props.getListOfUsers}
									formatData={formatUserForTypeAhead}
									DynamicsType="projectManager"
									placeholderKey="PLACEHOLDER_PROJECT_MANAGER"
									className="required"
									labelName="LABEL_PROJECT_MANAGER"
									validationKey="LABEL_PROJECT_MANAGER"
									submitParam="email"
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
									validate={[Validate.required('LABEL_PROJECT_SCOPE'), Validate.maxLength(5000)]}
									labelKey="LABEL_PROJECT_SCOPE"
								/>
								<Field
									name="cnNumber"
									type="text"
									component={PdsFormInput}
									validate={[Validate.maxLength(25)]}
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
											normalize={normalizeToNumber}
											disabled={true}
										>
											<FormattedMessage id="PLACEHOLDER_PROJECT_STATUS">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{getDropdown(props.projectstatus, LookupType.Project_Status)}
										</Field>
									</div>
								</div>

								<div className={'form-group'}>
									<label>
										<FormattedMessage id="LABEL_TYPE_OF_ENGAGEMENT" />
									</label>
									<div className="select-wrapper">
										<Field
											name="engagementId"
											component={PdsFormSelect}
											normalize={normalizeToNumber}
										>
											<FormattedMessage id="PLACEHOLDER_TYPE_OF_ENGAGEMENT">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{getDropdown(props.projectstatus, LookupType.Engagement_Type)}
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
											onChange={onCountryChange}
										>
											<FormattedMessage id="PLACEHOLDER_COUNTRY">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{props.countries &&
												props.countries.map((data: ICountry, i: number) => {
													return (
														<option key={data.countryId} value={data.countryId}>
															{data.name}
														</option>
													);
												})}
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
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{props.currencies &&
												props.currencies.map((data: ICurrency, i: number) => {
													return (
														<option key={data.currencyId} value={data.currencyId}>
															{data.currencyName} {data.currencySymbol && `(${data.currencySymbol})`}
														</option>
													);
												})}
										</Field>
									</div>
								</div>

								<Field
									name="probabilityOfWinning"
									type="text"
									component={PdsFormInput}
									labelKey="LABEL_PROBABILITY_OF_WINING"
									placeholderKey="PLACEHOLDER_WIN_PROBABILITY"
									className="width-100 required"
									validate={[
										Validate.required('LABEL_PROBABILITY_OF_WINING'),
										Validate.maxLength(5),
										onlyNumber
									]}
									messageKey="MESSAGE_PROBABILITYOFWINING"
									normalize={restrictMinusAndAllowDecimalForMaxRangeHundred}
								/>

								<Field
									name="approxValue"
									type="text"
									component={PdsFormInput}
									className="width-120 pl-20 required"
									validate={[
										Validate.required('LABEL_APPROXIMATE_VALUE'),
										Validate.maxLength(1000),
										onlyNumber
									]}
									normalize={restrictMinusAndAllowDecimal}
									currency={getFilterElementFromArray(
										props.currencies,
										getPropertyName(CurrencyObj, (prop) => prop.currencyId),
										props.currencyId > 0 ? props.currencyId : props.userPreferenceCurrencyId,
										getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
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
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{getDropdown(props.projectstatus, LookupType.Contract_Type)}
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
												Validate.required('LABEL_ASSETS_WORKED_ON')
											]}
											normalize={normalizeToNumber}
										>
											<FormattedMessage id="PLACEHOLDER_FIRST_ASSET">
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											>{getDropdown(props.projectstatus, LookupType.Asset_Type)}
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
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{getDropdown(props.projectstatus, LookupType.Asset_Type)}
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
												{(message) => <option value="">{message}</option>}
											</FormattedMessage>
											{getDropdown(props.projectstatus, LookupType.Asset_Type)}
										</Field>
									</div>
								</div>
								<Field
									name="soldMargin"
									type="text"
									component={PdsFormInput}
									labelKey="LABEL_BID_MARGIN"
									className="pl-30 width-288"
									discountBind="%"
									validate={[Validate.maxLength(5)]}
									normalize={restrictMinusAndAllowDecimalForMaxRangeHundred}
								/>

								<Field
									name="weightedTCV"
									type="text"
									component={PdsFormInput}
									labelKey="LABEL_WEIGHTED_TCV"
									className="pl-20 width-288"
									normalize={restrictMinusAndDecimal}
									currency={getFilterElementFromArray(
										props.currencies,
										getPropertyName(CurrencyObj, (prop) => prop.currencyId),
										props.currencyId > 0 ? props.currencyId : props.userPreferenceCurrencyId,
										getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
									)}
								/>

								{false && (
									<Field
										name={'rank'}
										type="text"
										labelKey="LABEL_RANK"
										input={{
											value: calculateRank(props.probabilityOfWinning, props.approximateValue),
											disabled: true
										}}
										component={PdsFormInput}
										className="static-field"
									/>
								)}

								<Field
									labelKey="LABEL_COMMENTS"
									name="comment"
									rows="7"
									component={PdsFormTextArea}
									validate={[Validate.maxLength(5000)]}
									placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
								/>
							</div>
						</div>
						<div className="hr_line mb-0 mt-4" />
						<div className="mr-35 two-side-btn">
							<button
								className="active ml-auto"
								type="button"
								name="saveAndClose"
								onClick={handleSubmit((values) => props.onSave(values))}
							>
								<FormattedMessage id="BUTTON_SAVE" />
							</button>
							<button type="button" name="next" onClick={handleSubmit((values) => props.onNext(values))}>
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
	currencyId: selector(state, 'currencyId'),
	countryId: selector(state, 'countryId'),
	contractorId: selector(state, 'contractorId'),
	companyId: selector(state, 'companyId'),
	probabilityOfWinning: selector(state, 'probabilityOfWinning'),
	approximateValue: selector(state, 'approxValue'),
	userPreferenceCurrencyId: userPreferenceSelector(state, 'currencyId'),
	firstAssetWorkedOn: selector(state, 'firstAssetWorkedOn'),
	secondAssetWorkedOn: selector(state, 'secondAssetWorkedOn'),
	thirdAssetWorkedOn: selector(state, 'thirdAssetWorkedOn')
});

const form = reduxForm<IProjectDetail, Props>({
	form: 'ProjectForm',
	enableReinitialize: true
})(ProjectForm);

const selector = formValueSelector('ProjectForm');
const userPreferenceSelector = formValueSelector('UserProfileForm');

export default connect(mapStateToProps, {
	changeCurrencyId: currencyId => change("ProjectForm", "currencyId", currencyId)
})(form);
