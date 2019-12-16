import React from 'react';
import { shallow } from 'enzyme';
import Tile from './index';
import {findByTestAtrr,checkProps} from '../../helpers/test-helper';

describe('card tile component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
        <Tile heading='heading-test' content='content-test'/>
    );
  });
  
  it('defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  }); 

  it('should Not throw a warning for proptypes', () => {
      const expectedProps = {
        heading: '',
       content: ''
      };
      const propsError = checkProps(Tile, expectedProps);
      expect(propsError).toBeUndefined();
    });

  it('should renders the heading', () => {
    expect(findByTestAtrr(wrapper,'card-heading')).toBeDefined();
  });

  it('should renders the content', () => {
    expect(findByTestAtrr(wrapper,'card-content')).toBeDefined();
  });
  
});
