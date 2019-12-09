import React from 'react';
import {ISubContractorActivity} from '../store/SubContractor/Types/ISubContractorActivity';
import IDiscountCalculation from '../models/IDiscountCalculation';

export const updateObject = (oldState, updatedProperties) => {
  return {
    ...oldState,
    ...updatedProperties
  };
};

export const getPropertyName = (obj, expression) => {
  var res = {};
  Object.keys(obj).map(k => {
    res[k] = () => k;
  });
  return expression(res)();
};
export const getLookupDescription = (allLookups, lookupKey, lookupItem) => {
  return allLookups.find(
    lk => lk.lookupItem === lookupItem && lk.lookupKey === lookupKey.toString()
  ).description;
};
export const getDropdown = (data, value) => {
  let result =
    data &&
    data.map((status: any, i: number) => {
      if (status.lookupItem == value) {
        return (
          <option key={status.lookupId} value={+status.lookupKey}>
            {status.description}
          </option>
        );
      }
    });
  return result;
};

export const normalizeToNumber = value => (
  value = +value
)

export const getFilterElementFromArray = (array:any, property:string,value:number | string,getproperty:string) => {
  let element = '';
  let filter;
  if (array) {
    filter = array.find(ele => ele[property] == value);
    if (filter != null && filter != undefined) element = filter[getproperty];
  }
  return element;
}; 

export const calculateSell = (cost:number,margin:number) =>{
  let sell =0;
  let divide = (1- margin/100)
  if(divide != 0)
  sell = cost / divide;
  return sell.toFixed(2);
}

export const calculateAverageMargin = (totalCost:number,totalSell:number) =>{
  let averageMargin =0;
  if(totalSell > 0 && totalCost > 0)
  averageMargin = ((totalSell-totalCost) / totalSell)  * 100
  return averageMargin.toFixed(2);
}

export const getSubContractorDiscountValue = (data:Array<ISubContractorActivity>,state:IDiscountCalculation) => {
        data.map((element:ISubContractorActivity)=>{
            state.cost = state.cost + (+element.totalCost);
            state.sell = state.sell + (+calculateSell(element.totalCost,element.grossMargin));
            state.margin = state.margin + (+element.grossMargin);
        })
    return {cost:state.cost,sell:state.sell,margin:state.margin};
}
export const generateUUID=()=>{
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
export const calculateCost = (noOfHours:number,hourRate:number) =>{
  let totalCost =0;
  if(noOfHours > 0 && hourRate > 0)
  totalCost=noOfHours*hourRate;
  return totalCost.toFixed(2);
}