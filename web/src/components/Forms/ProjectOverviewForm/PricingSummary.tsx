import React,{useState} from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import * as actions from '../../../store/rootActions';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import { calculateSell, calculateAverageMargin} from '../../../helpers/formulas';
import { getSubContractorSummaryCalculation, getPreliminarySummaryCalculation, getDiscountSummaryCalculation} from '../../../helpers/pricing-calculation-helper';
import ISummaryCalculation from '../../../store/SummaryCalculation/Types/ISummaryCalculation';
import {IPreliminariesComponentDetails} from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import { FormattedMessage } from 'react-intl';
import {IDiscountActivity} from '../../../store/DiscountForm/Types/IDiscountActivity'; 
import { calculateClientDiscount } from '../../../helpers/formulas';

interface Props {
    projectId?:string;
    currencySymbol:string;
    showPreliminary?:boolean;
    showSubContractor?:boolean;
    showDiscount?:boolean;
} 

interface IMapStateToProps {
    summaryCalculation:ISummaryCalculation;
    subContractorState:Array<ISubContractorActivity>;
    preliminaryState:Array<IPreliminariesComponentDetails>;
    discountState:IDiscountActivity;
}

interface IMapDispatchToProps {
    getSubContractor: (projectId:string) => void;
    getPreliminaryDetails: (projectId: string) => void;
    getDiscountData: (projectId: string) => void;
}

const PricingSummary:React.FC<Props & IMapStateToProps & IMapDispatchToProps> = props => {
    let initDiscount:ISummaryCalculation = {cost:0,sell:0,margin:0}
    const [subContractorData,setSubContractorData] = useState({...initDiscount});
    const [preliminaryData,setPreliminaryData] = useState({...initDiscount});
    const [discountData,setDiscountData] = useState({...initDiscount});
    
    React.useEffect(()=>{
      if (props.projectId != '' && props.projectId != undefined && props.projectId != null) {
        if(props.showSubContractor)
          props.getSubContractor(props.projectId);
        if(props.showPreliminary)
          props.getPreliminaryDetails(props.projectId);
        if(props.showDiscount)
          props.getDiscountData(props.projectId);
      }
    },[]);

    React.useEffect(()=>{
        if(props.subContractorState)
          setSubContractorData(getSubContractorSummaryCalculation(props.subContractorState,{...initDiscount}));
    },[props.subContractorState]);

    React.useEffect(()=>{
        if(props.preliminaryState && props.preliminaryState.length > 0) 
          setPreliminaryData(getPreliminarySummaryCalculation(props.preliminaryState,{...initDiscount}));
    },[props.preliminaryState]);

    React.useEffect(()=>{
        if(props.discountState)
          setDiscountData(getDiscountSummaryCalculation(props.discountState,discountData));
    },[props.discountState]);

    return (
    <div className="col-lg-12 px-0">
        <div className="price-sumry discount_table">
          <div className="inner-block">
            <table className="price-table">
              <thead>
                <tr>
                  <th></th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_COST'></FormattedMessage>({props.currencySymbol}) </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_MARGIN'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_SELL'></FormattedMessage>({props.currencySymbol}) </th>
                </tr>
              </thead>
              <tbody>
                {props.showPreliminary ? <tr data-test='preliminary-data'>
                  <td>
                    <span data-test='total-cost-summary'>Preliminary</span></td>
                  <td>
                    <span data-test='total-margin-summary'>
                      {props.currencySymbol}{preliminaryData.cost}
                    </span>
                  </td>
                  <td>
                    <span data-test='gross-margin-summary'>
                      {preliminaryData.margin}
                    </span>
                    (%)
                  </td>
                  <td>
                    {props.currencySymbol}
                    <span data-test='total-sell-summary'>
                      {preliminaryData.sell}
                    </span>
                  </td>
                </tr>
                :null}

                {props.showSubContractor ? <tr data-test='sub-contractor-data'>
                  <td>
                    <span>Sub Contractor</span></td>
                  <td>
                  {props.currencySymbol}
                    <span data-test='sub-contractor-cost'>
                      {subContractorData.cost}
                    </span>
                  </td>
                  <td>
                    <span data-test='sub-contractor-margin'>
                      {subContractorData.margin}
                    </span>
                    (%)
                  </td>
                  <td>
                    {props.currencySymbol}
                    <span data-test='sub-contractor-sell'>
                      {subContractorData.sell}
                    </span>
                  </td>
                </tr>
                :null}

               {props.showDiscount ? <tr data-test='discount-data'>
                  <td>
                    <span data-test='total-cost-summary'>Discount</span></td>
                  <td>
                    <span data-test='total-margin-summary'>
                      {props.currencySymbol}{props.discountState.supplierTotalDiscount}
                    </span>
                  </td>
                  <td>
                    
                  </td>
                  <td>
                    {props.currencySymbol}
                    <span data-test='total-sell-summary'>
                    {props.discountState && 
                    calculateClientDiscount(
                      props.discountState.discountType,
                      props.summaryCalculation.cost,
                      props.discountState.clientDiscount as number)}
                    </span>
                  </td>
                </tr>
                :null}
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

export default connect(mapStateToProps,mapDispatchToProps)(PricingSummary);
 