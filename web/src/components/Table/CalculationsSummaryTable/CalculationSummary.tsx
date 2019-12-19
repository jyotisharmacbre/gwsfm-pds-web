import { calculateSell, calculateAverageMargin,calculateClientDiscount} from '../../../helpers/formulas';
import {ISubContractorActivity} from '../../../store/SubContractor/Types/ISubContractorActivity';
import ISummaryCalculation from '../../../store/SummaryCalculation/Types/ISummaryCalculation';
import {IPreliminariesComponentDetails} from '../../../store/Preliminaries/Types/IPreliminariesComponentDetails';
import {IPreliminariesItems} from '../../../store/Preliminaries/Types/IPreliminariesItems';
import {IDiscountActivity} from '../../../store/DiscountForm/Types/IDiscountActivity';

export const getPreliminarySummaryCalculation = (data:Array<IPreliminariesComponentDetails>,state:ISummaryCalculation) => {
        if(data.length >0)
        {
          data.map((details:IPreliminariesComponentDetails)=>{
            details.items.map((element:IPreliminariesItems)=>{
            state.cost = state.cost + (+element.totalCost);
            state.sell = state.sell + (+calculateSell(element.totalCost,element.grossMargin));
            state.margin = state.margin + (+element.grossMargin);
          })
          })
        }
        return {cost:state.cost,sell:state.sell,margin:state.margin};  
}

export const getDiscountSummaryCalculation = (data:IDiscountActivity,state:ISummaryCalculation) => {
    if(data.supplierTotalDiscount != undefined)
      state.cost = state.cost - data.supplierTotalDiscount;
    if(data.clientDiscount != undefined){
      state.sell = state.sell - (+calculateClientDiscount(data.discountType,state.sell,data.clientDiscount));
    }
    state.margin = +calculateAverageMargin(state.cost,state.sell)
    return {cost:state.cost,sell:state.sell,margin:state.margin};
}

export const getSubContractorSummaryCalculation = (data:Array<ISubContractorActivity>,state:ISummaryCalculation) => {
        data.map((element:ISubContractorActivity)=>{
            state.cost = state.cost + (+element.totalCost);
            state.sell = state.sell + (+calculateSell(element.totalCost,element.grossMargin));
            state.margin = state.margin + (+element.grossMargin);
        })
    return {cost:state.cost,sell:state.sell,margin:state.margin};
}