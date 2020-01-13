import React from 'react';
import {
  calculateSell,
  calculateAverageMargin,
  calculateTotalCost
  } from '../formulas';

describe('Summary calculation formulas run without error', () => {
  
  it('should calculate total sell', () => {
    let result = +calculateSell(100,20);
    expect(result).toBe(125);
  });

  it('should calculate average margin', () => {
    let result = +calculateAverageMargin(100,125);
    expect(result).toBe(20); 
  });
  it('should calculate total cost', () => {
    let result = calculateTotalCost(100);
    let expecedResult=(1.4*100)/100
    expect(result).toBe(expecedResult); 
  });
});
