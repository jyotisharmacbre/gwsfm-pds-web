import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import CalculationsSummaryType from '../../../enums/CalculationsSummaryType'; 
import {calculateSell,calculateAverageMargin,getSubContractorDiscountValue} from '../../../helpers/utility-helper';
import IDiscountCalculation from '../../../models/IDiscountCalculation';
import { FormattedMessage } from 'react-intl';
 
interface Props {
    subContractor?:Array<ISubContractorActivity>;
    name:CalculationsSummaryType;
}

interface IMapStateToProps {
    subContractorState:Array<ISubContractorActivity>;
}

const CalculationsSummaryTable:React.FC<Props> = (props:any) => {
    let initDiscount:IDiscountCalculation = {cost:0,sell:0,margin:0}
    const [reduxState,setReduxState] = React.useState<IDiscountCalculation>({...initDiscount});
    const [formState,setFormState] = React.useState<IDiscountCalculation>({...initDiscount});
    
    React.useEffect(()=>{
        let localReduxState:IDiscountCalculation = {...initDiscount}; 
        if(props.name != CalculationsSummaryType.subContractor && props.subContractorState){
        getSubContractorDiscountValue(props.subContractorState,localReduxState);
        }
        if(props.name != CalculationsSummaryType.testing && props.testing){
        getSubContractorDiscountValue(props.testing,localReduxState);
        }
        setReduxState(localReduxState);
    },[props.subContractorState,props.testing]);

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
                  <th><FormattedMessage id='T_HEADING_TOTAL_COST'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_MARGIN'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_GROSS_MARGIN'></FormattedMessage> </th>
                  <th><FormattedMessage id='T_HEADING_TOTAL_SELL'></FormattedMessage> </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${formState.cost}</td>
                  <td>{calculateAverageMargin(formState.cost,formState.sell)}(%)</td>
                  <td>${(formState.sell-formState.cost).toFixed(2)}</td>
                  <td>${formState.sell.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state: IState) => ({
  subContractorState: state.subContractor.form.activities,
  testing: state.subContractor.form.activities
});

export default connect(mapStateToProps,null)(CalculationsSummaryTable);
