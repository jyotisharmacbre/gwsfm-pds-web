export const calculateTotalSum = (...values) =>{
  let total =0;
  debugger;
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

export const calculateAverageMargin = (totalCost:number,totalSell:number) =>{
  let averageMargin =0;
  if(totalSell > 0 && totalCost > 0)
  averageMargin = ((totalSell-totalCost) / totalSell)  * 100
  return averageMargin.toFixed(2);
}

export const calculateSell = (cost:number,margin:number) =>{
  let sell =0;
  let divide = (1- margin/100);
  if(divide != 0)
  sell = cost / divide;
  return sell.toFixed(2);
}


export const calculateClientDiscount = (discountType:number,cost:number,value:number) => {
    if(discountType == 2)
      return value;
    else 
      return (cost * (value/100)).toFixed(2);
}
