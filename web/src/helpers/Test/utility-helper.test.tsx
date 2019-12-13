import React from 'react';
import {
  calculateSell,
  normalizeToNumber,
  getFilterElementFromArray,
  calculateAverageMargin,
  getSubContractorSummaryCalculation,
  getPreliminarySummaryCalculation} from '../../helpers/utility-helper';
import {currencies} from './utility-helper-test-data';
import IDiscountCalculation from '../models/IDiscountCalculation';
import {newActivity} from '../../store/SubContractor/InitialState';

describe('utility helper functions run without error', () => {
  
  it('should return the curency symbol', () => {
    let expectedResult = '$';
    let result = getFilterElementFromArray(currencies,'currencyId',1,'currencySymbol');
    expect(result).toBe(expectedResult);
  });

  it('should convert string to number', () => {
    let expectedResult = 1;
    let result = normalizeToNumber('1');
    expect(result).toBe(expectedResult);
  });

  it('should calculate total sell', () => {
    let result = +calculateSell(100,20);
    expect(result).toBe(125);
  });

  it('should calculate average margin', () => {
    let result = +calculateAverageMargin(100,125);
    expect(result).toBe(20); 
  });
  
  it('should calculate summary for sub contractor object', () => {
      let initialValue:IDiscountCalculation = {cost:100,sell:125,margin:20};
      let expectedResult:IDiscountCalculation = {cost:200,sell:250,margin:40};
      let activity = {...newActivity};
      activity.totalCost = 100;
      activity.grossMargin = 20;
      activity.totalSell = +calculateSell(activity.totalCost,activity.grossMargin);
      let result = getSubContractorSummaryCalculation([activity],initialValue);
      expect(result).toStrictEqual(expectedResult); 
    });
});
