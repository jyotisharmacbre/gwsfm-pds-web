import React, { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import * as actions from '../store/rootActions';
import { IPreliminaries } from '../store/Preliminaries/Types/IPreliminaries';
import { convertIntoDatabaseModel, bindUserData } from '../store/Preliminaries/DataWrapper';
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { FormattedMessage, injectIntl } from 'react-intl';
import EventType from '../enums/EventType';
import { getPropertyName, getFilterElementFromArray, getClassNameForProjectStatus } from '../helpers/utility-helper';
import { formValueSelector, isDirty, reset } from 'redux-form';
import Currency from '../store/Lookups/InitialState/Currency';
import { History } from 'history';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { insuranceRateHoc, IInsuranceRateHoc } from '../hoc/InsuranceRateHoc';
import { IAdminDefaults } from '../store/Admin/Types/IAdminDefault';
import { ICountryHoc, countryHoc } from '../hoc/CountryHoc';
import { ICountry } from '../store/Lookups/Types/ICountry';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { confirmAlert } from '../components/Popup/CustomModalPopup';
import IReactIntl from '../Translations/IReactIntl';

interface IMapStateToProps {
	preliminaryDetails: Array<IPreliminariesComponentDetails>;
	lookupData: Array<ILookup>;
	currencies: Array<ICurrency> | null;
	match: any;
	notify: Notify;
	currencyId: number;
	status: number;
	preliminaryForm: Array<IPreliminariesComponentDetails>;
	history: History;
	subContractorState: Array<ISubContractorActivity>;
	discountState: IDiscountActivity;
	countries: Array<ICountry> | null;
	adminDefaultValues: Array<IAdminDefaults>;
	project: IProjectDetail;
	isPreliminaryFormDirty:boolean;
	intl:any;
}
interface IMapDispatchToProps {
	preliminaryAdd: (preliminaryDetails: Array<IPreliminaries>, event: EventType) => void;
	preliminaryEdit: (preliminaryDetails: Array<IPreliminaries>, event: EventType) => void;
	getPreliminaryDetails: (projectId: string) => void;
	updateInputField: (inputData: any) => void;
	getAllCurrencies: () => void;
	getProjectStatus: () => void;
	getProjectDetail: (projectId: string) => void;
	getSubContractor: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getProjectParameters: (countryId: number) => void;
	getAllCountries: () => void;
	resetPreliminaryFormState:()=>void;
	resetPreliminaryState:()=>void;
}

const Preliminaries: React.FC<IMapStateToProps & IMapDispatchToProps & ICountryHoc & IInsuranceRateHoc&IReactIntl> = (props) => {
	
	const CurrencyObj = new Currency();
	const [currencySymbol, setCurrencySymbol] = useState<string>('');
	const [event, setEvent] = useState<EventType>(EventType.none);
	const [loading, setLoading] = useState<boolean>(false);
	let componentIds: Array<string> = [];
	const [ componentIdList, setComponentId ] = useState(componentIds);
	let isLookupSessionExists: boolean =
		sessionStorage.getItem('lookupData') != null &&
		sessionStorage.getItem('lookupData') != undefined &&
		sessionStorage.getItem('lookupData') != '';
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getProjectDetail(props.match.params.projectId);
		if (!isLookupSessionExists) {
			props.getProjectStatus();
		}
		if (!props.currencies) {
			props.getAllCurrencies();
		}		
		props.getAllCountries();
		props.getSubContractor(props.match.params.projectId);
		props.getDiscountData(props.match.params.projectId);
	}, []);

	useEffect(
		() => {
			if (props.notify == Notify.success) {
				toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
				if (event == EventType.next) {
					props.history.push('/Subcontractor/' + props.match.params.projectId);
				}
			} else if (props.notify == Notify.error) {
				toast.error(formatMessage('MESSAGE_ERROR_MESSAGE'));
			}
			setLoading(false);
			props.resetPreliminaryState();
		},
		[ props.notify]
	);
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
		[ props.currencyId, props.currencies ]
	);

	useEffect(
		() => {
			if (props.project.countryId > 0) {
				props.getProjectParameters(props.project.countryId);
			}
		},
		[ props.project.countryId ]
	);

	//Following code will also re-render Preliminaries on lnaguage change, as lookup data gets update on language change. 
	useEffect(()=>{
	
			props.getPreliminaryDetails(props.match.params.projectId);
		
	}, [props.lookupData]);

	const [ isExpand, handleExpandAllEvent ] = useState(false);
	/* istanbul ignore next */
	const handleResetStateAndRedirection=(componentName:string)=>{
		props.resetPreliminaryFormState();
		props.history.push(`/${componentName}/${props.match.params.projectId}`);
	}
	/* istanbul ignore next */
	const redirectionToComponent=()=>{
		if(props.isPreliminaryFormDirty)
		{
			confirmAlert({
				intl: props.intl,
				titleKey: 'TITLE_CONFIRMATION',
				contentKey: 'MESSAGE_DIRTY_CHECK',
				handleConfirm: () => handleResetStateAndRedirection("JustificationAuthorisation")})
		}
		else{
			handleResetStateAndRedirection("JustificationAuthorisation");
		   }
		
	  }
	  /* istanbul ignore next */
	const handleToggle = (id: string) => {
		componentIds = componentIdList;
		var element: any = document.getElementById('collapse_' + id);
		if (element != null) {
			var isClassExists = element.classList.contains('show');
			if (isClassExists && getClassNameForProjectStatus(props.status) != 'link_disabled') {
				element.classList.add('hide');
				element.classList.remove('show');
			} else {
				element.classList.remove('hide');
				element.classList.add('show');
			}
		}
		if (!componentIds.includes(id)) {
			componentIds.push(id);
			let componentData = [ ...componentIds ];
			setComponentId(componentData);
		}
	};
	/* istanbul ignore next */
	const handlePrevious = () => {
		redirectionToComponent();
	  };
	  /* istanbul ignore next */
	const handleSaveData = (saveAll: boolean, event: EventType, preliminaryDetails: any, index: number) => {
		setLoading(true);
		setEvent(event);
		var editData: Array<IPreliminaries> = [];
		var saveData: Array<IPreliminaries> = [];
		let preData: Array<IPreliminariesComponentDetails> = [];
		preData.push(preliminaryDetails.preliminaryDetails[index]);
		var preliminariesData: Array<IPreliminaries> = saveAll
			? convertIntoDatabaseModel(preliminaryDetails.preliminaryDetails, props.match.params.projectId)
			: convertIntoDatabaseModel(preData, props.match.params.projectId);
		
		//user can edit the data if already save entry is there in database. without checking any parameters	
		editData = preliminariesData.filter((data) => {
			return data.PreliminaryId != '';
		});
		// user can save the data only if there is total cost value greater than zero as discussed with ram
		saveData = preliminariesData.filter((data) => {
			return data.TotalCost > 0 && data.PreliminaryId == '';
		});
		if (editData.length > 0 && saveData.length > 0) {
			props.preliminaryEdit(editData, event);
			props.preliminaryAdd(saveData, event);
		} else if (editData.length > 0) {
			props.preliminaryEdit(editData, event);
		} else if (saveData.length > 0) {
			props.preliminaryAdd(saveData, event);
		} else {
			if(event==EventType.next)
			{
				props.history.push('/Subcontractor/' + props.match.params.projectId);
			}
		}
	};
	
	return (
		<div className="container-fluid">
			<div data-test="pre_row_status" className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-lg-12">
					<form className="custom-wrap">
						<div className="heading-subtitle">
							<h1>
								<span className="d-md-block d-none">
									<FormattedMessage id="TITLE_JUSTIFICATION" />
								</span>
								<span className="d-md-none">
									{' '}
									<FormattedMessage id="TITLE_JUSTIFICATION_SHORT" />
								</span>
							</h1>
							<p className="text-green">
								{' '}
								<FormattedMessage id="PAGE_PRELIMINARY_TITLE" />
							</p>
						</div>

						<div className="row">
							<div className="col-lg-12">
								<div className="row">
									<div className="col-lg-9">
										<div className="table-responsive">
											<CalculationsSummaryTable
												preliminary={props.preliminaryForm}
												subContractor={props.subContractorState}
												discount={props.discountState}
												currencySymbol={currencySymbol}
												insuranceRate={props.insuranceRate}
											/>
										</div>
									</div>
									<div className="col-lg-3">
										<div className="text-left text-lg-right">
											<button
												type="button"
												className={`active fltRght mb-3 mb-lg-0 btn-collapseall" ${isExpand
													? 'hide'
													: 'show'}`}
												data-test="btn-expandall"
												onClick={() => handleExpandAllEvent(true)}
											>
												<FormattedMessage id="BUTTON_EXPAND_ALL" />
											</button>
											<button
												type="button"
												className={`active fltRght mb-3 mb-lg-0 btn-collapseall" ${isExpand
													? 'show'
													: 'hide'}`}
												data-test="btn-collapseall"
												onClick={() => handleExpandAllEvent(false)}
											>
												<FormattedMessage id="BUTTON_COLLAPSE_ALL" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{props.preliminaryDetails.length > 0 ? (
							<div>
								<PreliminaryForm
									onSave={handleSaveData}
									onPrevious={handlePrevious}
									onToggle={handleToggle}
									isExpand={isExpand}
									componentIdList={componentIdList}
									preliminariesDetails={props.preliminaryDetails}
									currencySymbol={getFilterElementFromArray(
										props.currencies,
										getPropertyName(CurrencyObj, (prop) => prop.currencyId),
										props.currencyId,
										getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
									)}
									insuranceRate={props.insuranceRate}
									countryCode={props.countryCode}
									preliminaryState={props.preliminaryForm}
									subContractorState={props.subContractorState}
									discountState={props.discountState}
									projectStatus = {props.status}
									loading = {loading}
									event = {event}
								/>
							</div>
						) : null}
					</form>
				</div>
			</div>
		</div>
	);
};

const selector = formValueSelector('PreliminaryForm');

const mapStateToProps = (state: IState) => {
	return {
		preliminaryDetails: state.preliminary.preliminaryDetails,
		lookupData: state.lookup.projectstatus,
		currencies: state.lookup.currencies,
		notify: state.preliminary.notify,
		currencyId: state.project.form.currencyId,
		status: state.project.form.status,
		preliminaryForm: selector(state, 'preliminaryDetails'),
		subContractorState: state.subContractor.form.activities,
		discountState: state.discount.form,
		adminDefaultValues: state.admin.adminDefaultValues,
		countries: state.lookup.countries,
		project: state.project.form,
		isPreliminaryFormDirty:isDirty("PreliminaryForm")(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		preliminaryAdd: (preliminaryDetails, event) => dispatch(actions.preliminaryAdd(preliminaryDetails, event)),
		preliminaryEdit: (preliminaryDetails, event) => dispatch(actions.preliminaryEdit(preliminaryDetails, event)),
		getProjectDetail: (projectId: string) => dispatch(actions.getProjectDetail(projectId)),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getProjectStatus: () => dispatch(actions.getProjectStatus()),
		getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		getAllCountries: () => dispatch(actions.getAllContries()),
		resetPreliminaryFormState:()=>dispatch(reset("PreliminaryForm")),
		resetPreliminaryState:()=>dispatch(actions.resetPreliminaryState())
	};
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(countryHoc(insuranceRateHoc(Preliminaries))));
