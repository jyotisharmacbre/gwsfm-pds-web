import React, { useState, useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps, formValueSelector, getFormValues, FieldArray } from 'redux-form';
import PdsFormInput from '../../PdsFormHandlers/PdsFormInput';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { Validate } from '../../../helpers/fieldValidations';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LookupType } from '../../../store/Lookups/Types/LookupType';
import {
	getPropertyName,
	getDiscountTypeValue,
	getFilterElementFromArray,
	maxLimitTo,
	restrictMinusAndAllowDecimalForMaxRangeHundred,
	restrictMinusAndAllowDecimal
} from '../../../helpers/utility-helper';
import { calculateClientDiscount, calculateTotalSum } from '../../../helpers/formulas';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import Currency from '../../../store/Lookups/InitialState/Currency';
import { MainTitle } from '../../Title/Title';
import { IDiscountActivity } from '../../../store/DiscountForm/Types/IDiscountActivity';
import CalculationsSummaryTable from '../../Table/CalculationsSummaryTable';
import ISummaryCalculation from '../../../models/ISummaryCalculation';
import IPricing from '../../../models/IPricing';
import { IDynamicContractCustomerData } from '../../../store/DynamicsData/Types/IDynamicData';
import { ISubContractorActivity } from '../../../store/SubContractor/Types/ISubContractorActivity';
import { IPreliminariesComponentDetails } from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import {
	getSubContractorSummaryCalculation,
	getPreliminarySummaryCalculation,
	getSupplierTotalDiscount,
} from '../../../helpers/pricing-calculation-helper';
import ValidatedNumericInput from '../../NumericInput';
import { toast } from 'react-toastify';
import * as services from '../../../services';
import DiscountSubContractorForm from './DiscountSubContractorForm';
import IReactIntl from '../../../Translations/IReactIntl';
import IClientDiscount from '../../../store/DiscountForm/Types/IClientDiscount';

interface Props {
	onNext: (data: IDiscountActivity) => void;
	onSave: (data: IDiscountActivity) => void;
	onPrevious: () => void;
	projectstatus: any;
	currencies: Array<ICurrency> | null;
	currencyId: any;
	contractorId: string;
	otherCustomerName: string;
	projectId: string;
	dynamicsContractCustomerData: Array<IDynamicContractCustomerData>;
	insuranceRate: number;
}

interface IMapStateToProps {
	initialValues: IDiscountActivity;
	clientDiscount: IClientDiscount;
	discountForm: {} | IDiscountActivity;
	userPreferenceCurrencyId: number;
	subContractorState: Array<ISubContractorActivity>;
	preliminaryState: Array<IPreliminariesComponentDetails>;
}

let DiscountForm: React.FC<
	Props & IMapStateToProps & IReactIntl & InjectedFormProps<IDiscountActivity, Props & IMapStateToProps>
> = (props) => {
	const { handleSubmit, initialValues, clientDiscount, intl } = props;
	const normalize = (value) => (value ? parseInt(value) : null);
	const CurrencyObj = new Currency();
	const [currencySymbol, setCurrencySymbol] = useState<string>('');
	let initDiscount: IPricing = { cost: 0, sell: 0, margin: 0 };
	const [subContractorCalc, setSubContractorCalc] = useState<IPricing>({ ...initDiscount });
	const [preliminaryCalc, setPreliminaryCalc] = useState<IPricing>({ ...initDiscount });
	const [contractor, setContractor] = useState<string>('');
	// const currencySymbol = getFilterElementFromArray(
	// 	props.currencies,
	// 	getPropertyName(CurrencyObj, (prop) => prop.currencyId),
	// 	props.currencyId > 0 ? props.currencyId : props.userPreferenceCurrencyId,
	// 	getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
	// );
	useEffect(
		() => {
			if (props.currencyId > 0 && props.currencies) {
				setCurrencySymbol(
					getFilterElementFromArray(
						props.currencies,
						getPropertyName(CurrencyObj, (prop) => prop.currencyId),
						props.currencyId,
						getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
					)
				);
			}
		},
		[props.currencyId, props.currencies]
	);

	useEffect(
		() => {
			if (props.subContractorState) {
				setSubContractorCalc(getSubContractorSummaryCalculation(props.subContractorState));
			}
		},
		[props.subContractorState]
	);

	useEffect(
		() => {
			if (props.preliminaryState && props.preliminaryState.length > 0) {
				setPreliminaryCalc(getPreliminarySummaryCalculation(props.preliminaryState));
			}
		},
		[props.preliminaryState]
	);

	useEffect(
		() => {
			if (props.contractorId) {
				if (props.contractorId == '0') setContractor(props.otherCustomerName);
				else
					services
						.getContractsAndCustomers(props.contractorId)
						.then((response) => {
							getContractorSuccess(response.data);
						})
						.catch((error) => {
							failure(error);
						});
			}
		},
		[props.contractorId]
	);

	const getContractorSuccess = (response) => {
		let filter = response.find((ele) => ele.contractId == props.contractorId);
		if (filter) setContractor(filter.contractName);
	};

	const failure = (error) => {
		toast.error('Some error occured');
	};

	return (
		<div className="discount_form">
			<CalculationsSummaryTable
				preliminary={props.preliminaryState}
				subContractor={props.subContractorState}
				discount={props.discountForm}
				currencySymbol={currencySymbol}
				insuranceRate={props.insuranceRate}
			/>
			<div className=" row">
				<div className="col-lg-12 col-sm-12">
					<div className="Discountforms_wrap">
						<form className="custom-wrap p-0" onSubmit={handleSubmit} noValidate={true}>
							<div className=" row">
								<div className="col-lg-6">
									<h2>
										<FormattedMessage id="TITLE_SUBCONTRACTOR_DISCOUNT" />
									</h2>
								</div>
								<div className="col-lg-6">
									<h6 className="discount-supplierTotalDiscount text-lg-right">
										<FormattedMessage id="LABEL_TOTAL_SUBCONTRACTOR_DISCOUNT" /> :

									    <span data-test="supplierTotalDiscountValue">
											{
												props.discountForm && getSupplierTotalDiscount(props.discountForm['subContractorDiscounts'])
											}
										</span>
									</h6>
								</div>
							</div>
							<FieldArray
								name="subContractorDiscounts"
								component={DiscountSubContractorForm}
								intl={props.intl}
								currencySymbol={currencySymbol}
							/>
							<div className="row">
								<div className="col-lg-12">
									<div className="hr_line" />
								</div>
							</div>

							<div className="row">
								<div className="col-lg-12">
									<h2>
										<FormattedMessage id="TITLE_CLIENT_DISCOUNT" />
									</h2>
								</div>
							</div>

							<div className="forms_wrap">
								<div className="row">
									<div className="col-lg-7">
										<div className="discount-subcontractor-section">
											<Field
												input={{
													value: contractor,
													disabled: true
												}}
												type="text"
												component={PdsFormInput}
												labelKey="LABEL_CLIENT"
												messageKey="LABEL_CLIENT"
												placeholderKey="PLACEHOLDER_ENTER_CLIENT_NAME"
											/>
											<Field
												name="clientDiscount.clientState"
												type="text"
												component={PdsFormInput}
												validate={[Validate.maxLength(1000)]}
												messageKey="MESSAGE_STATE_DETAILS"
												labelKey="LABEL_STATE_DETAILS"
												placeholderKey="PLACEHOLDER_ENTER_STATE_DETAILS"
											/>
											<div className="form-group">
												<label>
													<FormattedMessage id="LABEL_DISCOUNT_TYPE" />
												</label>
												{props.projectstatus &&
													props.projectstatus
														.filter((element) => element.lookupItem == LookupType.Discount_Type)
														.map((data, index) => {
															return (
																<div className="form-check" key={index}>
																	<Field
																		name="clientDiscount.discountType"
																		component="input"
																		type="radio"
																		value={+data.lookupKey}
																		normalize={normalize}
																	/>
																	<label className="form-check-label">
																		<FormattedMessage id={data.description} />
																	</label>
																</div>
															);
														})}
											</div>
											<Field
												name="clientDiscount.discount"
												type="number"
												className="width-120 pl-20"
												component={PdsFormInput}
												validate={[Validate.maxLength(15)]}
												messageKey="MESSAGE_DISCOUNT"
												labelKey="LABEL_DISCOUNT"
												placeholderKey="PLACEHOLDER_DISCOUNT"
												normalize={restrictMinusAndAllowDecimalForMaxRangeHundred}
												discountBind={getDiscountTypeValue(
													props.projectstatus &&
													props.projectstatus.filter(
														(element) => element.lookupItem == LookupType.Discount_Type
													),
													clientDiscount?.discountType,
													currencySymbol
												)}
												divPosition="relative"
											/>
											<label className="w-100 mb-0">
												<FormattedMessage id="LABEL_SUB_TOTAL_DISCOUNTS" />
											</label>
											<label className="m-0 mb-4">
												{currencySymbol}
												{calculateClientDiscount(
													clientDiscount?.discountType,
													calculateTotalSum(subContractorCalc.sell, preliminaryCalc.sell),
													clientDiscount?.discount ? clientDiscount?.discount : 0
												)}
											</label>
											<Field
												name="clientDiscount.clientComments"
												rows={7}
												type="textarea"
												component={PdsFormTextArea}
												validate={[Validate.maxLength(5000)]}
												labelKey="LABEL_COMMENTS"
												placeholderKey="PLACEHOLDER_ADDITIONAL_COMMENTS"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="hr_line mb-0 mr-t-40" />
							<div className="mr-35 three-btn">
								<button
									className="active"
									type="button"
									name="previous"
									onClick={() => props.onPrevious()}
								>
									<FormattedMessage id="BUTTON_PREVIOUS" />
								</button>
								<button
									className="active ml-auto"
									type="button"
									name="save"
									style={{ marginLeft: '35%' }}
									onClick={handleSubmit((values) => props.onSave(values))}
								>
									<FormattedMessage id="BUTTON_SAVE" />
								</button>
								<button
									type="button"
									name="next"
									className=""
									onClick={handleSubmit((values) => props.onNext(values))}
								>
									<FormattedMessage id="BUTTON_NEXT" />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div >
	);
};

const mapStateToProps = (state: IState) => ({
	initialValues: state.discount.form,
	clientDiscount: discountSelector(state, 'clientDiscount'),
	discountForm: getFormValues('DiscountForm')(state),
	userPreferenceCurrencyId: userPreferenceSelector(state, 'currencyId'),
	subContractorState: state.subContractor.form.activities,
	preliminaryState: state.preliminary.preliminaryDetails
});

const form = reduxForm<IDiscountActivity, Props & IMapStateToProps>({
	form: 'DiscountForm',
	enableReinitialize: true,
})(injectIntl(DiscountForm));

const discountSelector = formValueSelector('DiscountForm');
const userPreferenceSelector = formValueSelector('UserProfileForm');

export default connect(mapStateToProps)(form);
