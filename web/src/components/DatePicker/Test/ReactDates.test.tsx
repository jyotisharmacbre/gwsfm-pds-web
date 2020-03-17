import React from 'react';
import { shallow } from 'enzyme';
import ReactDates, { validDate, isOutsideRange, extractDateFromInputBox } from '../ReactDates';
import moment from 'moment';
import { findByTestAtrr } from '../../../helpers/test-helper';

describe('ReactDates test cases', () => {
  let wrapper: any;
  const props: any = {
    input: {
      value: {
        date() {
          return 24;
        },
        month() {
          return 1;
        },
        year() {
          return 2020
        },

      },
      name: 'date',
      onChange: jest.fn()
    },
    meta: { touched: true, error: false, warning: false },
    placeholder: '',
    disabled: '',
    required: ''
  };
  const componentShallow = props => {
    wrapper = shallow(<ReactDates {...props} />);
  };

  it('Defines the component', () => {
    componentShallow(props);
    expect(wrapper).toBeDefined();
  });
  describe('ValidDate test cases with day, year and month having valid values', () => {
    var testScenarios1 =
      [{ enablePastDate: true, isDateInitiallyEmpty: true, expectedResult: true },
      { enablePastDate: true, isDateInitiallyEmpty: false, expectedResult: true },
      { enablePastDate: false, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: false, expectedResult: false }]

    testScenarios1.forEach(s => {
      it(`should return ${s.expectedResult} if selected date is less than today date with 
            enablePastDate ${s.enablePastDate} and isDateInitiallyEmpty ${s.isDateInitiallyEmpty}`, () => {
        let year = new Date().getFullYear();
        let day = new Date().getDate() - 1;
        let month = new Date().getMonth() + 1;
        let result = validDate(year, month, day, s.enablePastDate, s.isDateInitiallyEmpty);
        expect(result).toBe(s.expectedResult);
      });
    });

    var testScenarios2 =
      [{ enablePastDate: true, isDateInitiallyEmpty: true, expectedResult: true },
      { enablePastDate: true, isDateInitiallyEmpty: false, expectedResult: true },
      { enablePastDate: false, isDateInitiallyEmpty: true, expectedResult: true },
      { enablePastDate: false, isDateInitiallyEmpty: false, expectedResult: true }]

    testScenarios2.forEach(s => {
      it(`should return ${s.expectedResult} if selected date is greater than today date with 
            enablePastDate ${s.enablePastDate} and isDateInitiallyEmpty ${s.isDateInitiallyEmpty}`, () => {
        let year = new Date().getFullYear();
        let day = new Date().getDate() + 1;
        let month = new Date().getMonth() + 1;
        let result = validDate(year, month, day, false, false);
        expect(result).toBe(s.expectedResult);
      });
    });
  });

  describe('ValidDate test cases if year is not a number', () => {
    var testScenarios =
      [{ enablePastDate: true, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: true, isDateInitiallyEmpty: false, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: false, expectedResult: false }]

    testScenarios.forEach(s => {
      it(`should return ${s.expectedResult} with enablePastDate ${s.enablePastDate} 
              and isDateInitiallyEmpty ${s.isDateInitiallyEmpty}`, () => {
        let result = validDate(NaN, 1, 28, false, false);
        expect(result).toBe(s.expectedResult);
      });
    });
  });

  describe('ValidDate test cases if month is not a number', () => {
    var testScenarios =
      [{ enablePastDate: true, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: true, isDateInitiallyEmpty: false, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: false, expectedResult: false }]

    testScenarios.forEach(s => {
      it(`should return ${s.expectedResult} with enablePastDate ${s.enablePastDate} 
              and isDateInitiallyEmpty ${s.isDateInitiallyEmpty}`, () => {
        let result = validDate(2020, NaN, 28, false, false);
        expect(result).toBe(s.expectedResult);
      });
    });
  });

  describe('ValidDate test cases if day is not a number', () => {
    var testScenarios =
      [{ enablePastDate: true, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: true, isDateInitiallyEmpty: false, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: true, expectedResult: false },
      { enablePastDate: false, isDateInitiallyEmpty: false, expectedResult: false }]

    testScenarios.forEach(s => {
      it(`should return ${s.expectedResult} with enablePastDate ${s.enablePastDate} 
              and isDateInitiallyEmpty ${s.isDateInitiallyEmpty}`, () => {
        let result = validDate(2020, 1, NaN, false, false);
        expect(result).toBe(s.expectedResult);
      });
    });
  });

  it('should set window variable name', () => {
    expect(window['date']).toBeDefined();
  });
  it('should return false if enable pastdate is true', () => {
    expect(isOutsideRange(true, {})).toEqual(false);
  });
  it('should return true if pastdate not allowed and date is previous date', () => {
    const previousDay = moment().subtract(1, 'days');
    //It means any date previous dates not allowed
    expect(isOutsideRange(false, previousDay)).toEqual(true);
  });

  it('should return false given pastdate not allowed and date is current date', () => {
    const currentDay = moment();
    //It means any date current or after current is allowed
    expect(isOutsideRange(false, currentDay)).toEqual(false);
  });

  it('should return auto corrected value if wrong date is entered and initially all date field is blank', () => {
    let props: any = {
      input: {
        name: 'date',
        onChange: jest.fn()
      },
      enablePastDate: true,
      isDateInitiallyEmpty: true,
      meta: { touched: true, error: false, warning: false },
      placeholder: '',
      disabled: '',
      required: ''
    };
    componentShallow(props);
    let dayField = findByTestAtrr(wrapper, 'date');
    dayField.simulate("change", { target: { value: "31" } });
    dayField.simulate("blur", { target: { value: "31" } });

    let monthField = findByTestAtrr(wrapper, 'month');
    monthField.simulate("change", { target: { value: "04" } });
    monthField.simulate("blur", { target: { value: "04" } });

    let yearField = findByTestAtrr(wrapper, 'year');
    yearField.simulate("change", { target: { value: "2020" } });
    yearField.simulate("blur", { target: { value: "2020" } });

    let result = extractDateFromInputBox(31, 4, 2020);
    expect(result.isSame('2020-05-01', 'year')).toEqual(true);
    expect(result.isSame('2020-05-01', 'month')).toEqual(true);
    expect(result.isSame('2020-05-01', 'date')).toEqual(true);

    expect(props.input.onChange).toHaveBeenCalled();
  });
});
