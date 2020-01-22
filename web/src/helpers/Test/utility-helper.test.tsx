import React from 'react';
import {
  normalizeToNumber,
  getFilterElementFromArray,
  restrictMinusAndAllowDecimal,
  restrictMinusAndAllowDecimalForMaxRangeHundred
} from '../../helpers/utility-helper';
import {currencies} from './utility-helper-test-data';

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
  it('should not allow negtive value', () => {
    let expectedResult = 0;
    let result = restrictMinusAndAllowDecimal(-1);
    expect(result).toBe(expectedResult);
  });
  it('should not allow letter in value', () => {
    let expectedResult = 0;
    let inputvalue:any="rish123";
    let result = restrictMinusAndAllowDecimal(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should  allow decimal  value', () => {
    let expectedResult = "123.33";
    let inputvalue:any=123.33;
    let result = restrictMinusAndAllowDecimal(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should  allow whole number', () => {
    let expectedResult = "123";
    let inputvalue:any=123;
    let result = restrictMinusAndAllowDecimal(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should not allow decimal place more than two digits', () => {
    let expectedResult = "123.66";
    let inputvalue:any=123.666;
    let result = restrictMinusAndAllowDecimal(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should not allow negtive value', () => {
    let expectedResult = 0;
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(-1);
    expect(result).toBe(expectedResult);
  });
  it('should not allow letter in value', () => {
    let expectedResult = 0;
    let inputvalue:any="rish123";
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should  allow decimal  value', () => {
    let expectedResult = "123.33";
    let inputvalue:any=123.33;
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should  allow whole number', () => {
    let expectedResult = "123";
    let inputvalue:any=123;
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should not allow decimal place more than two digits', () => {
    let expectedResult = "123.66";
    let inputvalue:any=123.666;
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(inputvalue);
    expect(result).toBe(expectedResult);
  });
  it('should return 100 if value greater than max limit of 100 number', () => {
    let expectedResult = 100;
    let inputvalue:any=123.666;
    let result = restrictMinusAndAllowDecimalForMaxRangeHundred(inputvalue);
    expect(result).toBe(expectedResult);
  });
});
