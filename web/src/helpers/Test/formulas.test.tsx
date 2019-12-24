import React from 'react';
import {
  calculateSell,
  calculateAverageMargin
  } from '../formulas';
import ISummaryCalculation from '../../store/SummaryCalculation/Types/ISummaryCalculation';
import {newActivity} from '../../store/SubContractor/InitialState';

describe('Summary calculation formulas run without error', () => {
  
  it('should calculate total sell', () => {
    let result = +calculateSell(100,20);
    expect(result).toBe(125);
  });

  it('should calculate average margin', () => {
    let result = +calculateAverageMargin(100,125);
    expect(result).toBe(20); 
  });
});
