import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import {
  calculateSell,
  calculateAverageMargin,
  getSubContractorDiscountValue,
  getPreliminarySummaryCalculation} 
from '../../../helpers/utility-helper';
import IDiscountCalculation from '../../../models/IDiscountCalculation';
import {IPreliminariesComponentDetails} from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
interface Props {
    projectId?:string;
    subContractor?:Array<ISubContractorActivity>;
    name:CalculationsSummaryType;
    currencySymbol?:string;
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
    const [reduxState,setReduxState] = React.useState<IDiscountCalculation>({...initDiscount});
    const [formState,setFormState] = React.useState<IDiscountCalculation>({...initDiscount});
    
    React.useEffect(()=>{
      if (props.projectId != '') {
        props.getSubContractor(props.projectId);
        props.getPreliminaryDetails(props.projectId);
      }
    },[]);

    React.useEffect(()=>{
        let localReduxState:IDiscountCalculation = {...initDiscount}; 
        if(props.name != CalculationsSummaryType.subContractor && props.subContractorState){
        getSubContractorDiscountValue(props.subContractorState,localReduxState);
        }
        if(props.name != CalculationsSummaryType.preliminary && props.preliminaryState){
        getPreliminarySummaryCalculation(props.preliminaryState,localReduxState);
        }
        setReduxState(localReduxState);
    },[props.subContractorState,props.preliminaryState]);

    React.useEffect(()=>{
        if(props.subContractor){
        setFormState(getSubContractorDiscountValue(props.subContractor,{...reduxState}));
        }
    },[props.subContractor]);

    return (
    <div className="col-lg-8 px-0">
        <div className="price-sumry discount_table">
          <div className="inner-block">
            <table className="price-table">
              <thead>
                <tr>
                  <th>T_HEADING_TOTAL_COST </th>
                  <th>T-HEADING_TOTAL_MARGIN </th>
                  <th>T-HEADING_GROSS_MARGIN </th>
                  <th>T-HEADING_TOTAL_SELL </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.currencySymbol}{formState.cost}</td>
                  <td>{calculateAverageMargin(formState.cost,formState.sell)}(%)</td>
                  <td>{props.currencySymbol}{(formState.sell-formState.cost).toFixed(2)}</td>
                  <td>{props.currencySymbol}{formState.sell.toFixed(2)}</td>
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
