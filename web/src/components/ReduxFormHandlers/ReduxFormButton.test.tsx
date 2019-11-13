import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import ReduxFormButton from './ReduxFormButton';
import { findByTestAtrr,checkProps } from '../../helpers/unit-test-helper';

describe('ReduxFormButton Component',()=>{
    describe('Checking PropTypes',()=>{
        it('Should Not throw a warning',()=>{
            const expectedProps ={
                buttons:[],
                input:'', 
                label:''
            };
            const propsError = checkProps(ReduxFormButton,expectedProps);
            expect(propsError).toBeUndefined(); 
        });
    });
});

describe('ReduxFormButton Renders',()=>{
    let wrapper:any;
    beforeEach(()=>{
        const props={
            buttons:[{
                title: 'YES',
                value: true
              },
              {
                title: 'NO',
                value: false
              }],
            input:React.Component, 
            label:''
        };
        wrapper = shallow(<ReduxFormButton {...props} />);
    });
    it('Should render a button',()=>{
        const button = findByTestAtrr(wrapper,'buttonComponent');
        expect(button.length).toBe(2);
    })
});