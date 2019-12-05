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


export const getCurrencySymbol = (currencies, currencyId) => {
  let symbol = '';
  let filter;
  if (currencies) {
    filter = currencies.find(element => element.currencyId == currencyId);
    if (filter != null && filter != undefined) symbol = filter.currencySymbol;
  }
  return symbol;
};



export const getDiscountTypeValue = (data, value, currency) =>{
let result = data && data.map((dataValue: any, i: number) => {
  if(dataValue.lookupKey == value){
    let arr= dataValue.description.split(' ');
    let arrValue = arr[1][1];
    if(arrValue == "#"){
      return currency;
    }
    else{
      return arrValue;
    }
  }
})
return result;
}

