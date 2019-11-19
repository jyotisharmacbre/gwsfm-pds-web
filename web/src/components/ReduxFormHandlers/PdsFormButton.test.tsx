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
          title: 'YES',
          value: true
        },
        {
          title: 'NO',
          value: false
        }
      ],
      input: React.Component,
      label: ''
    };
    wrapper = shallow(<PdsFormButton {...props} />);
  });
  it('Should render a button', () => {
    const button = findByTestAtrr(wrapper, 'buttonComponent');
    expect(button.length).toBe(2);
  });
});
