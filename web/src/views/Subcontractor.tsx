import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SubcontractorForm from '../components/Forms/Subcontractor/SubcontractorForm';
import { ISubContractor } from '../store/SubContractor/Types/ISubContractor';
import * as actions from '../store/rootActions';
import { IState } from '../store/state';
import EventType from '../enums/EventType';
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';
import { getPropertyName, getFilterElementFromArray, getClassNameForProjectStatus } from '../helpers/utility-helper';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { FormattedMessage, injectIntl } from 'react-intl';
import Currency from '../store/Lookups/InitialState/Currency';
import ProjectStatus from '../enums/ProjectStatus';
import { History } from 'history';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { formatMessage } from '../Translations/connectedIntlProvider';
import { insuranceRateHoc, IInsuranceRateHoc } from '../hoc/InsuranceRateHoc';
import { IAdminDefaults } from '../store/Admin/Types/IAdminDefault';
import { IProjectDetail } from '../store/CustomerEnquiryForm/Types/IProjectDetail';
import { isDirty, reset } from 'redux-form';
import IReactIntl from '../Translations/IReactIntl';
import { confirmAlert } from '../components/Popup/CustomModalPopup';

interface IProps {
	match: any;
	history: History;
	isSubcontractorFormDirty:boolean;
	intl:any;
}

interface IMapStateToProps {
	form: ISubContractor;
	notify: Notify;
	event: EventType;
	currencyId: number;
	currencies: Array<ICurrency> | null;
	status: number;
	preliminaryState: Array<IPreliminariesComponentDetails>;
	discountState: IDiscountActivity;
	subContractorState: Array<ISubContractorActivity>;
	adminDefaultValues: Array<IAdminDefaults>;
	project: IProjectDetail;
	loading: boolean;
}

interface IMapDispatchToProps {
	subContractorFormAdd: (projectId: string, form: ISubContractor, event: EventType) => void;
	subContractorFormEdit: (projectId: string, contractId: string, form: ISubContractor, event: EventType) => void;
	getSubContractor: (projectId: string) => void;
	getProjectDetail: (projectId: string) => void;
	resetSubContractorState: () => void;
	getAllCurrencies: () => void;
	getPreliminaryDetails: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
	getProjectParameters: (countryId: number) => void;
	resetSubcontractorFormState:()=>void;
}

const Subcontractor: React.FC<IProps & IMapStateToProps & IMapDispatchToProps & IInsuranceRateHoc& IReactIntl> = (props) => {
	let paramProjectId: string = '';
	const CurrencyObj = new Currency();
	const [ currencySymbol, setCurrencySymbol ] = React.useState('$');

	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllCurrencies();
		paramProjectId = props.match.params.projectId;
		if (paramProjectId != null && paramProjectId != '') {
			props.getProjectDetail(paramProjectId);
			props.getSubContractor(paramProjectId);
			props.getPreliminaryDetails(paramProjectId);
			props.getDiscountData(paramProjectId);
		}
	}, []);

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
			if (props.notify == Notify.success) {
				if (props.event == EventType.next) {
					toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
					props.history.push(`/Discounts/${props.match.params.projectId}`);
				} else if (props.event == EventType.previous) {
					toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
					props.history.push(`/preliminaries/${props.match.params.projectId}`);
				} else if (props.event == EventType.save) {
					toast.success(formatMessage('MESSAGE_SUCCESSFUL'));
				}
				props.resetSubContractorState();
			}
		},
		[ props.notify, props.event ]
	);

	useEffect(
		() => {
			if (props.project.countryId > 0) {
				props.getProjectParameters(props.project.countryId);
			}
		},
		[ props.project.countryId ]
	);
	/* istanbul ignore next */
	const handleResetStateAndRedirection=(componentName:string)=>{
		props.resetSubcontractorFormState();
		props.history.push(`/${componentName}/${props.match.params.projectId}`);
	}
	/* istanbul ignore next */
	const redirectionToComponent=()=>{
		if(props.isSubcontractorFormDirty)
		{
			confirmAlert({
				intl: props.intl,
				titleKey: 'TITLE_CONFIRMATION',
				contentKey: 'MESSAGE_DIRTY_CHECK',
				handleConfirm: () => handleResetStateAndRedirection('preliminaries')})
		}
		else{
			handleResetStateAndRedirection('preliminaries');
		   }
	  }
	  /* istanbul ignore next */
	  const handlePrevious = () => {
		redirectionToComponent();
	  };
	  /* istanbul ignore next */
	const handleEvent = (data: ISubContractor, event: EventType) => {
		paramProjectId = props.match.params.projectId;
		props.subContractorState[0].subContrActivityId == ''
			? props.subContractorFormAdd(paramProjectId, data, event)
			: props.subContractorFormEdit(paramProjectId, props.subContractorState[0].subContrActivityId, data, event);
	};

	return (
		<div className="container-fluid">
			<div data-test="sub_row_status" className={`${getClassNameForProjectStatus(props.status)} row`}>
				<div className="col-lg-12">
					<div className="custom-wrap">
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
								<FormattedMessage id="PAGE_SUB_TITLE" />
							</p>
						</div>
						<SubcontractorForm
							projectId={props.match.params.projectId}
							onSubmitForm={handleEvent}
							onPrevious = {handlePrevious}
							currencySymbol={currencySymbol}
							preliminaryState={props.preliminaryState}
							discountState={props.discountState}
							insuranceRate={props.insuranceRate}
							event = {props.event}
							loading = {props.loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IState) => ({
	form: state.subContractor.form,
	notify: state.subContractor.notify,
	event: state.subContractor.event,
	loading: state.subContractor.loading,
	currencyId: state.project.form.currencyId,
	currencies: state.lookup.currencies,
	status: state.project.form.status,
	preliminaryState: state.preliminary.preliminaryDetails,
	discountState: state.discount.form,
	subContractorState: state.subContractor.form.activities,
	adminDefaultValues: state.admin.adminDefaultValues,
	project: state.project.form,
	isSubcontractorFormDirty:isDirty("subContractorForm")(state),
});

const mapDispatchToProps = (dispatch) => {
	return {
		subContractorFormAdd: (projectId, form, event) =>
			dispatch(actions.subContractorFormAdd(projectId, form, event)),
		subContractorFormEdit: (projectId, contractId, form, event) =>
			dispatch(actions.subContractorFormEdit(projectId, contractId, form, event)),
		getProjectDetail: (projectId) => dispatch(actions.getProjectDetail(projectId)),
		getSubContractor: (projectId) => dispatch(actions.getSubContractor(projectId)),
		resetSubContractorState: () => dispatch(actions.resetSubContractorNotifier()),
		getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
		getPreliminaryDetails: (projectId: string) => dispatch(actions.getPreliminaryDetails(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId)),
		getProjectParameters: (countryId: number) => dispatch(actions.getProjectParameters(countryId)),
		resetSubcontractorFormState:()=>dispatch(reset("subContractorForm"))

	};
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(insuranceRateHoc(Subcontractor)));
