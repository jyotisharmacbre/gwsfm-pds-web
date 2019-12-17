import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import PdsFormButton from './PdsFormButton';
import { findByTestAtrr, checkProps } from '../../helpers/test-helper';

describe('PdsFormButton Component', () => {
  describe('Checking PropTypes', () => {
    it('Should Not throw a warning', () => {
      const expectedProps = {
        buttons: [],
        input: '',
        label: ''
      };
      const propsError = checkProps(PdsFormButton, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
});

describe('PdsFormButton Renders', () => {
  let wrapper: any;
  beforeEach(() => {
    const props = {
      buttons: [
        {
          title: 'BUTTON_YES',
          value: true
        },
        {
          title: 'BTTON_NO',
          value: false
        }
      ],
      input: React.Component,
      label: ''
    };
    wrapper = shallow(<PdsFormButton {...props} />);
  });
  it('Should render first button without active class', () => {
    const button_1 = findByTestAtrr(wrapper, 'buttonComponent_0');
    expect(button_1.length).toBe(1);
    expect(button_1.hasClass('active button-type')).toEqual(false);
  });

  it('should render second button with active class', () => {
    const button_2 = findByTestAtrr(wrapper, 'buttonComponent_1');
    expect(button_2.length).toBe(1);
    expect(button_2.hasClass('active button-type')).toBeTruthy;
  });
   
});
