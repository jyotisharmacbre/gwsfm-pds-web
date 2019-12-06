import React from 'react';

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
  if(cost > 0 && margin > 0)
  sell = cost / (1- margin/100);
  return sell.toFixed(2);
}

export const calculateAverageMargin = (totalSell:number,totalCost:number) =>{
  let averageMargin =0;
  if(totalSell > 0 && totalCost > 0)
  averageMargin = ((totalSell-totalCost) / totalSell)  * 100
  return averageMargin.toFixed(2);
}