import React from 'react';
import {
  calculateSell,
  calculateAverageMargin
} from '../formulas';
import {
  getSubContractorSummaryCalculation,
  getPreliminarySummaryCalculation,
  getSupplierTotalDiscount,
  getDiscountSummaryCalculation
} from '../pricing-calculation-helper';
import ISummaryCalculation from '../../store/SummaryCalculation/Types/ISummaryCalculation';
import { newActivity } from '../../store/SubContractor/InitialState';
import { getSubContractorDiscountsWithDiscountAsNumber, getSubContractorDiscountsWithDiscountAsString } from './pricing-calculation-helper-test-data';
describe('Summary calculation helper run without error', () => {

  it('should calculate summary for sub contractor object', () => {
    let initialValue: ISummaryCalculation = { cost: 100, sell: 125, margin: 20 };
    let expectedResult: ISummaryCalculation = { cost: 200, sell: 250, margin: 20 };
    let activityOne = { ...newActivity };
    activityOne.totalCost = 100;
    activityOne.grossMargin = 20;
    activityOne.totalSell = +calculateSell(activityOne.totalCost, activityOne.grossMargin);
    let activityTwo = { ...newActivity };
    activityTwo.totalCost = 100;
    activityTwo.grossMargin = 20;
    activityTwo.totalSell = +calculateSell(activityTwo.totalCost, activityTwo.grossMargin);
    let result = getSubContractorSummaryCalculation([activityOne, activityTwo], initialValue);
    expect(result).toStrictEqual(expectedResult);
  });
});

describe('Sub contractor Discount calculation helper run without error', () => {
  it('should calculate SupplierTotalDiscount for sub contractor discounts when supplierDiscount is number format', () => {
    let result = getSupplierTotalDiscount(getSubContractorDiscountsWithDiscountAsNumber(3));
    expect(result).toStrictEqual(3);
  });
  it('should calculate SupplierTotalDiscount for sub contractor discounts when supplierDiscount is string format', () => {
    let result = getSupplierTotalDiscount(getSubContractorDiscountsWithDiscountAsString(3));
    expect(result).toStrictEqual(3);
  });
});