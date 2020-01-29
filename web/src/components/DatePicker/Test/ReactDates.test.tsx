import React from 'react';
import { shallow } from 'enzyme';
import ReactDates, { validDate } from '../ReactDates';

describe('ReactDates test cases', () => {
  let wrapper: any;
  beforeEach(() => {
    const props:any= {
        input:  {value:{
            date(){
return 24;
        },
        month(){
            return 1;
        },
        year(){
            return 2020
        },
        onChange:jest.fn()
    }},
        meta: { touched:true, error:false, warning:false },
        placeholder: '',
        disabled: '',
        required: ''
    };
    wrapper = shallow(<ReactDates {...props} />);
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should return false if selected date is less than today date', () => {
    let expectedResult=false;
    let year=new Date().getFullYear();
    let day=new Date().getDate()-1;
    let month=new Date().getMonth()+1;
    let result=validDate(year,month,day);
    expect(result).toBe(expectedResult);
});
it('should return true if selected date is greater than today date', () => {
  let expectedResult=true;
    let year=new Date().getFullYear();
    let day=new Date().getDate()+1;
    let month=new Date().getMonth()+1;
    let result=validDate(year,month,day);
  expect(result).toBe(expectedResult);
});
it('should return false if year is not a number', () => {
  let expectedResult=false;
  let result=validDate(NaN,1,28);
  expect(result).toBe(expectedResult);
});
it('should return false if month is not a number', () => {
  let expectedResult=false;
  let result=validDate(2020,NaN,28);
  expect(result).toBe(expectedResult);
});
it('should return false if day is not a number', () => {
  let expectedResult=false;
  let result=validDate(2020,1,NaN);
  expect(result).toBe(expectedResult);
});
});
