import React from 'react';
import {
  calculateSell,
  calculateAverageMargin} from '../../../../helpers/formulas';
import {
  getSubContractorSummaryCalculation,
  getPreliminarySummaryCalculation} from '../CalculationSummary';
import ISummaryCalculation from '../../../../store/SummaryCalculation/Types/ISummaryCalculation';
import {newActivity} from '../../../../store/SubContractor/InitialState';

describe('Summary calculation helper run without error', () => {
  
  it('should calculate summary for sub contractor object', () => {
      let initialValue:ISummaryCalculation = {cost:100,sell:125,margin:20};
      let expectedResult:ISummaryCalculation = {cost:200,sell:250,margin:40};
      let activity = {...newActivity};
      activity.totalCost = 100;
      activity.grossMargin = 20;
      activity.totalSell = +calculateSell(activity.totalCost,activity.grossMargin);
      let result = getSubContractorSummaryCalculation([activity],initialValue);
      expect(result).toStrictEqual(expectedResult); 
    });
});
