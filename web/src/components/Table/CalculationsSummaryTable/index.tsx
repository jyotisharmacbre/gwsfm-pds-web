import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import {
  calculateSell,
  calculateAverageMargin,
  getSubContractorSummaryCalculation,
  getPreliminarySummaryCalculation} 
from '../../../helpers/utility-helper';
import IDiscountCalculation from '../../../models/IDiscountCalculation';
import {IPreliminariesComponentDetails} from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
 
interface Props {
    projectId?:string;
    subContractor?:Array<ISubContractorActivity>;
    preliminary?:Array<IPreliminariesComponentDetails>;
    name:CalculationsSummaryType;
    currencySymbol:string;
}

interface IMapStateToProps {
    subContractorState:Array<ISubContractorActivity>;
    preliminaryState:Array<IPreliminariesComponentDetails>;
}

interface IMapDispatchToProps {
    getSubContractor: (projectId:string) => void;
    getPreliminaryDetails: (projectId: string) => void;
}

const CalculationsSummaryTable:React.FC<Props> = (props:any) => {
    let initDiscount:IDiscountCalculation = {cost:0,sell:0,margin:0}
    let reduxState = {...initDiscount};
    const [formState,setFormState] = React.useState<IDiscountCalculation>({...initDiscount});
    
    React.useEffect(()=>{
      if (props.projectId != '' && props.projectId != undefined && props.projectId != null) {
        props.getSubContractor(props.projectId);
        props.getPreliminaryDetails(props.projectId);
      }
    },[]);

    React.useEffect(()=>{
        let localFormState:IDiscountCalculation = {...initDiscount};
        if(props.name != CalculationsSummaryType.subContractor && props.subContractorState){
          getSubContractorSummaryCalculation(props.subContractorState,reduxState);
        }
        if(props.name != CalculationsSummaryType.preliminary && props.preliminaryState && props.preliminaryState.length > 0){ 
          getPreliminarySummaryCalculation(props.preliminaryState,reduxState);
        } 
        if(props.name == CalculationsSummaryType.subContractor && props.subContractor){
            localFormState = getSubContractorSummaryCalculation(props.subContractor,{...reduxState});
            setFormState(localFormState);
        }
        if(props.name == CalculationsSummaryType.preliminary && props.preliminary){
          localFormState = getPreliminarySummaryCalculation(props.preliminary,{...reduxState});
          setFormState(localFormState);
        }
    },[props.subContractorState,props.preliminaryState,props.subContractor,props.preliminary]);

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
                    <span data-test='total-cost-summary'>{formState.cost}</span></td>
                  <td>
                    <span data-test='total-margin-summary'>
                      {calculateAverageMargin(formState.cost,formState.sell)}
                    </span>
                    (%)
                  </td>
                  <td>{props.currencySymbol}
                    <span data-test='gross-margin-summary'>
                      {(formState.sell-formState.cost).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    {props.currencySymbol}
                    <span data-test='total-sell-summary'>
                      {formState.sell.toFixed(2)}
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
    getSubContractor: (projectId:string) =>
        dispatch(actions.getSubContractor(projectId)),
    getPreliminaryDetails: (projectId: string) =>
      dispatch(actions.getPreliminaryDetails(projectId)),
  };
};

const mapStateToProps = (state: IState) => ({
  subContractorState: state.subContractor.form.activities,
  preliminaryState: state.preliminary.preliminaryDetails
});

export default connect(mapStateToProps,mapDispatchToProps)(CalculationsSummaryTable);
