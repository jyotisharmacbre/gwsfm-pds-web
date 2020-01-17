
import { IAdminDefaults } from "../store/ProjectOverviewForm/Types/IAdminDefault";
import AdminFields from "../enums/AdminFields";

export const calculateTotalSum = (...values) =>{
  let total =0;
  for(let i=0;i<values.length;i++)
      total += values[i];;
  return total;
}
export const calculateCost = (noOfHours:number,hourRate:number) =>{
  let totalCost =0;
  if(noOfHours > 0 && hourRate > 0)
  totalCost=noOfHours*hourRate;
  return totalCost.toFixed(2);
}
export const calculateTotalCost = (cost:number) =>{
  let defaultData:any=(sessionStorage.getItem("defaultParameters"));
    let adminDefaultData:Array<IAdminDefaults>=(defaultData?JSON.parse(defaultData):[]);
    let insurranceCost=0;
    adminDefaultData.map((x)=>{
      if(x.name==AdminFields.InsuranceRatePerc){insurranceCost=parseFloat(x.value)}
  });
  let totalCost:number =(insurranceCost*cost)/100;
  return totalCost.toFixed(2);
}
export const calculateAverageMargin = (totalCost:number,totalSell:number) =>{
  let averageMargin =0;
  if(totalSell > 0 && totalCost > 0 &&totalSell && totalCost)
  {
    averageMargin = ((totalSell-totalCost) / totalSell)  * 100
  }
 
  return averageMargin.toFixed(2);
}

export const calculateSell = (cost:number,margin:number) =>{
  let sell =0;
  if(cost)
  {
    let divide = (1- margin/100);
    if(divide != 0)
    sell = cost / divide;
  }
  return sell.toFixed(2);
}


export const calculateClientDiscount = (discountType:number,cost:number,value:number) => {
    if(value == undefined)
      return 0;  
    else if(discountType == 2)
      return value;
    else 
      return ((cost>0?cost:0) * (value/100)).toFixed(2);
}

