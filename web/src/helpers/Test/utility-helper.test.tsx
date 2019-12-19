import React from 'react';
import {
  normalizeToNumber,
  getFilterElementFromArray
} from '../../helpers/utility-helper';
import {currencies} from './utility-helper-test-data';
import ISummaryCalculation from '../../store/SummaryCalculation/Types/ISummaryCalculation';
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
});
