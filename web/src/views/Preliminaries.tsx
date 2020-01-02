import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../store/state';
import { IPreliminariesComponentDetails } from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import * as actions from '../store/rootActions';
import PreliminaryForm from '../components/Forms/PreliminaryForm/PreliminaryForm';
import { IPreliminaries } from '../store/Preliminaries/Types/IPreliminaries';
import { convertIntoDatabaseModel } from "../store/Preliminaries/DataWrapper";
import { toast } from 'react-toastify';
import Notify from '../enums/Notify';
import { ILookup } from '../store/Lookups/Types/ILookup';
import { ICurrency } from '../store/Lookups/Types/ICurrency';
import { FormattedMessage } from 'react-intl';
import EventType from '../enums/EventType';
import CalculationsSummaryTable from '../components/Table/CalculationsSummaryTable';
import { getPropertyName,getFilterElementFromArray,getClassNameForProjectStatus } from '../helpers/utility-helper';
import { formValueSelector } from 'redux-form';
import Currency from '../store/Lookups/InitialState/Currency';
import ProjectStatus from '../enums/ProjectStatus';
import { History } from 'history';
import { ISubContractorActivity } from '../store/SubContractor/Types/ISubContractorActivity';
import { IDiscountActivity } from '../store/DiscountForm/Types/IDiscountActivity';
interface IMapStateToProps {
  preliminaryDetails: Array<IPreliminariesComponentDetails>;
  lookupData: Array<ILookup>;
  currencies: Array<ICurrency> | null;
  match: any;
  notify: Notify;
  event: EventType;
  currencyId: number;
  status:number;
  preliminaryForm:Array<IPreliminariesComponentDetails>;
  history:History;
  subContractorState: Array<ISubContractorActivity>;
  discountState: IDiscountActivity;
  preferedLangUpdateNotify: Notify;
}
interface IMapDispatchToProps {
  preliminaryAdd: (
    preliminaryDetails: Array<IPreliminaries>,
    event: EventType
  ) => void;
  preliminaryEdit: (
    preliminaryDetails: Array<IPreliminaries>,
    event: EventType
  ) => void;
  getPreliminaryDetails: (projectId: string) => void;
  updateInputField: (inputData: any) => void;
  getAllCurrencies: () => void;
  getProjectStatus: () => void;
  getProjectDetail: (projectId: string) => void;
  getSubContractor: (projectId: string) => void;
	getDiscountData: (projectId: string) => void;
}

const Preliminaries: React.FC<
  IMapStateToProps & IMapDispatchToProps
> = props => {
  let paramProjectId: string = '';
  const CurrencyObj = new Currency();
  const [ currencySymbol, setCurrencySymbol ] = useState<string>('');
  let isLookupSessionExists: boolean = (sessionStorage.getItem("lookupData") != null && sessionStorage.getItem("lookupData") != undefined && sessionStorage.getItem("lookupData") != "")

 
  useEffect(() => {
    window.scrollTo(0, 0);
    paramProjectId=props.match.params.projectId;
    props.getProjectDetail(paramProjectId);
    props.getProjectStatus();
    props.getAllCurrencies();
    if (paramProjectId != null && paramProjectId != '' && paramProjectId != undefined && isLookupSessionExists) {
      props.getPreliminaryDetails(paramProjectId);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.notify == Notify.success) {
      toast.success('Data Saved Successfully');
      if (props.event == EventType.next) {
        props.history.push('/Subcontractor/' + props.match.params.projectId);
      }
    }
    else if (props.notify == Notify.error) {
      toast.error('Error occured.Please contact to administrator.');
    }

  }, [props.notify, props.event]);
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
  useEffect(() => {
    const paramProjectId = props.match.params.projectId;
    if (paramProjectId != null && paramProjectId != '' && paramProjectId != undefined && isLookupSessionExists) {
      props.getPreliminaryDetails(paramProjectId);
    }
  }, [props.lookupData]);

  useEffect(() => {
   if(props.preferedLangUpdateNotify == Notify.success)
   {
    props.getProjectStatus();
    
   }

  }, [props.preferedLangUpdateNotify]);

  const handleExpandAllEvent = () => {
    var element: any = document.getElementsByClassName('expandAll');
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove('hide');
      element[i].classList.add('show');
    }
  };

  const handleToggle = (id: string) => {
    var element: any = document.getElementById('collapse_' + id);
    if (element != null) {
      var isClassExists = element.classList.contains('show');
      if (isClassExists) {
        element.classList.add('hide');
        element.classList.remove('show');
      } else {
        element.classList.remove('hide');
        element.classList.add('show');
      }
    }
  };
  const handleSaveData = (
    saveAll: boolean,
    event: EventType,
    preliminaryDetails: any,
    index: number

  ) => {
    var editData: Array<IPreliminaries> = [];
    var saveData: Array<IPreliminaries> = [];
    paramProjectId = props.match.params.projectId;
    let preData: Array<IPreliminariesComponentDetails> = [];
    preData.push(preliminaryDetails.preliminaryDetails[index]);
    var preliminariesData: Array<IPreliminaries> = saveAll ?
      convertIntoDatabaseModel(preliminaryDetails.preliminaryDetails, paramProjectId) :
      convertIntoDatabaseModel(preData, paramProjectId)
    editData = preliminariesData.filter((data) => {
      return (data.TotalCost > 0 && data.PreliminaryId != '');
    })
    saveData = preliminariesData.filter((data) => {
      return (data.TotalCost > 0 && data.PreliminaryId == '');
    })
    if (editData.length > 0 && saveData.length > 0) { props.preliminaryEdit(editData, event); props.preliminaryAdd(saveData, event); }
    else if (editData.length > 0) { props.preliminaryEdit(editData, event); }
    else if (saveData.length > 0) { props.preliminaryAdd(saveData, event) }
    else { toast.error('No data changed to save.'); }
  };
  const handlePrevious = () => {
    props.history.push(`/JustificationAuthorisation/${props.match.params.projectId}`);
  };

  return (
    <div className="container-fluid">
      <div data-test="pre_row_status"  className={`${getClassNameForProjectStatus(props.status)} row`}>
        <div className="col-lg-12">
          <form className="custom-wrap">
            <div className="heading-subtitle">
              <h1>
                <span className="d-md-block d-none">
                  <FormattedMessage id='TITLE_JUSTIFICATION'></FormattedMessage>
                </span>
                <span className="d-md-none"> <FormattedMessage id='TITLE_JUSTIFICATION_SHORT'></FormattedMessage></span>
              </h1>
              <p className="text-green"> <FormattedMessage id='PAGE_PRELIMINARY_TITLE'></FormattedMessage></p>
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
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="text-left text-lg-right">
                      <button type="button" className="active fltRght mb-3 mb-lg-0" onClick={() => handleExpandAllEvent()}><FormattedMessage id="BUTTON_EXPAND_ALL"></FormattedMessage></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <PreliminaryForm
                onSave={handleSaveData}
                onPrevious={handlePrevious}
                onToggle={handleToggle}
                preliminariesDetails={props.preliminaryDetails}
                currencySymbol={getFilterElementFromArray(
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
              />
            </div>
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
    event: state.preliminary.event,
    status:state.project.form.status,
    preliminaryForm: selector(state, 'preliminaryDetails'),
    subContractorState: state.subContractor.form.activities,
    discountState: state.discount.form,
    preferedLangUpdateNotify: state.userPreferences.notify
  };
};

const mapDispatchToProps = dispatch => {
  return {
    preliminaryAdd: (preliminaryDetails, event) =>
      dispatch(actions.preliminaryAdd(preliminaryDetails, event)),
    preliminaryEdit: (preliminaryDetails, event) =>
      dispatch(actions.preliminaryEdit(preliminaryDetails, event)),
    getProjectDetail: (projectId: string) =>
      dispatch(actions.getProjectDetail(projectId)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    getAllCurrencies: () => dispatch(actions.getAllCurrencies()),
    getProjectStatus: () => dispatch(actions.getProjectStatus()),
    getSubContractor: (projectId: string) => dispatch(actions.getSubContractor(projectId)),
		getDiscountData: (projectId: string) => dispatch(actions.getDiscountData(projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preliminaries);

