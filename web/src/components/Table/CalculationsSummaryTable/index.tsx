import React,{useReducer} from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import { calculateSell, calculateAverageMargin} from '../../../helpers/formulas';
import { getSubContractorSummaryCalculation, getPreliminarySummaryCalculation, getDiscountSummaryCalculation} from './CalculationSummary';
import ISummaryCalculation from '../../../store/SummaryCalculation/Types/ISummaryCalculation';
import {IPreliminariesComponentDetails} from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
import {IDiscountActivity} from '../../../store/DiscountForm/Types/IDiscountActivity'; 

interface Props {
    projectId?:string;
    subContractor?:Array<ISubContractorActivity>;
    preliminary?:Array<IPreliminariesComponentDetails>;
    discount?: {} | IDiscountActivity;
    name:CalculationsSummaryType;
    currencySymbol:string;
} 

interface IMapStateToProps {
    summaryCalculation:ISummaryCalculation;
    subContractorState:Array<ISubContractorActivity>;
    preliminaryState:Array<IPreliminariesComponentDetails>;
    discountState:IDiscountActivity;
}

interface IMapDispatchToProps {
    setSummaryCalculationState: (state:ISummaryCalculation) => void;
    getSubContractor: (projectId:string) => void;
    getPreliminaryDetails: (projectId: string) => void;
    getDiscountData: (projectId: string) => void;
}

const CalculationsSummaryTable:React.FC<Props & IMapStateToProps & IMapDispatchToProps> = props => {
    let initDiscount:ISummaryCalculation = {cost:0,sell:0,margin:0}
    let reduxState = {...initDiscount};
    
    React.useEffect(()=>{
      if (props.projectId != '' && props.projectId != undefined && props.projectId != null) {
        if(props.name != CalculationsSummaryType.subContractor)
          props.getSubContractor(props.projectId);
        if(props.name != CalculationsSummaryType.preliminary)
          props.getPreliminaryDetails(props.projectId);
        if(props.name != CalculationsSummaryType.discount)
          props.getDiscountData(props.projectId);
      }
    },[]);

    React.useEffect(()=>{
        let localFormState:ISummaryCalculation = {...initDiscount};
        if(props.name != CalculationsSummaryType.subContractor && props.subContractorState){
          getSubContractorSummaryCalculation(props.subContractorState,reduxState);
        }
        if(props.name != CalculationsSummaryType.preliminary && props.preliminaryState && props.preliminaryState.length > 0){ 
          getPreliminarySummaryCalculation(props.preliminaryState,reduxState);
        }
        if(props.name != CalculationsSummaryType.discount && props.discountState){ 
          getDiscountSummaryCalculation(props.discountState,reduxState);
        }
        if(props.name == CalculationsSummaryType.subContractor && props.subContractor){
            localFormState = getSubContractorSummaryCalculation(props.subContractor,{...reduxState});
            props.setSummaryCalculationState(localFormState);
        }
        if(props.name == CalculationsSummaryType.preliminary && props.preliminary){
          localFormState = getPreliminarySummaryCalculation(props.preliminary,{...reduxState});
          props.setSummaryCalculationState(localFormState);
        }
        if(props.name == CalculationsSummaryType.discount && props.discount){
          localFormState = getDiscountSummaryCalculation(props.discount as IDiscountActivity,{...reduxState});
          props.setSummaryCalculationState(localFormState);
        }
    },[props.subContractorState,props.preliminaryState,props.discountState,props.subContractor,props.preliminary,props.discount]);

    return (
    <div className="col-lg-12 px-0">
        <div className="price-sumry discount_table">
          <div className="inner-block">
            <table className="price-table">
              <thead>
                <tr>
                  <th><FormattedMessage id='T_HEADING_TOTAL_COST'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_MARGIN'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_GROSS_MARGIN'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_SELL'></FormattedMessage> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.currencySymbol}
                    <span data-test='total-cost-summary'>{props.summaryCalculation.cost}</span></td>
                  <td>
                    <span data-test='total-margin-summary'>
                      {calculateAverageMargin(props.summaryCalculation.cost,props.summaryCalculation.sell)}
                    </span>
                    (%)
                  </td>
                  <td>{props.currencySymbol}
                    <span data-test='gross-margin-summary'>
                      {(props.summaryCalculation.sell-props.summaryCalculation.cost).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    {props.currencySymbol}
                    <span data-test='total-sell-summary'>
                      {props.summaryCalculation.sell.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    setSummaryCalculationState: (state: ISummaryCalculation) =>
        dispatch(actions.setSummaryCalculationState(state)),
    getSubContractor: (projectId:string) =>
        dispatch(actions.getSubContractor(projectId)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
    getDiscountData: (projectId: string) =>
      dispatch(actions.getDiscountData(projectId)),
  };
};

const mapStateToProps = (state: IState) => ({
  summaryCalculation:state.summaryCalculation,
  subContractorState: state.subContractor.form.activities,
  preliminaryState: state.preliminary.preliminaryDetails,
  discountState:state.discount.form,
});

export default connect(mapStateToProps,mapDispatchToProps)(CalculationsSummaryTable);
