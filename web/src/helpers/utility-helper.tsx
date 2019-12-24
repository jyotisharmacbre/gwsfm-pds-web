import React from 'react';
import {ISubContractorActivity} from '../store/SubContractor/Types/ISubContractorActivity';
import ISummaryCalculation from '../store/SummaryCalculation/Types/ISummaryCalculation';
import {IPreliminariesComponentDetails} from '../store/Preliminaries/Types/IPreliminariesComponentDetails';
import {IPreliminariesItems} from '../store/Preliminaries/Types/IPreliminariesItems';
import {IDiscountActivity} from '../store/DiscountForm/Types/IDiscountActivity';

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

export const getRadioOptions = (data, value) => {
  let result =
    data &&
    data.map((status: any, i: number) => {      
      if (status.lookupItem == value) {
        return status;
      }
    });
  return result;
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

export const restrictMinus = (value:number) => {
  if(value < 0) {
    return 0
  } else {
    return value
  }
}

export const isValidGUID=(stringToTest:string)=>
{
  var regexGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regexGuid.test(stringToTest);
}

export const maxLimit = (value: number) =>{
  if(value<0){
    return 0
  } else if (value>100){
    return 100
  } else {
    return value
  }
}

export const calculateRank = (probabilityOfWinning:number,approximateValue:number) =>{ 
  return probabilityOfWinning * approximateValue;
}

