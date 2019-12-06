import React from 'react';
import { mount, shallow } from 'enzyme';
import SubContractorActivityForm from '../SubContractorActivityForm';
import {initialState} from '../../../../store/SubContractor/InitialState';
import {ActionType} from '../../../../store/SubContractor/Types/ActionType';
import subContractorReducer from '../../../../store/SubContractor/Reducer';
import {findByTestAtrr} from '../../../../helpers/test-helper';


describe('Sub Contractor Activity Form tests', () => {
  const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
  };
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <SubContractorActivityForm fields={initialState.form.activities}/>
    );
  });
  
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the SubContractorActivityForm component with no errors', () => {
    const wrapper = shallow(
      <SubContractorActivityForm fields={initialState.form.activities}/>
    );
    expect(findByTestAtrr(wrapper,'sub-contractor-form').length).toEqual(1);
  });

  it('should not renders the delete button', () => {
    const wrapper = shallow(
      <SubContractorActivityForm fields={initialState.form.activities}/>
    );
    expect(findByTestAtrr(wrapper,'deleteactivity').length).toEqual(0);
    expect(findByTestAtrr(wrapper,'activityName').length).toEqual(1);
  });

  it('should renders the delete button 2 times', () => {
    let state = (subContractorReducer(initialState,subContractorFormAddAction)).form.activities;
    const wrapper = shallow(
      <SubContractorActivityForm fields={state} totalCount={state.length}/>
    );
    expect(findByTestAtrr(wrapper,'deleteactivity').length).toEqual(2);
  });

  
  it('should renders the delete button 3 times', () => {
    let state = (subContractorReducer(subContractorReducer(initialState,subContractorFormAddAction),subContractorFormAddAction)).form.activities;
    const wrapper = shallow(
      <SubContractorActivityForm fields={state} totalCount={state.length}/>
    );
    expect(findByTestAtrr(wrapper,'deleteactivity').length).toEqual(3);
  });

  it('test delete activity click event', () => {
    const mockCallBack = jest.fn();
    let state = (subContractorReducer(initialState,subContractorFormAddAction)).form.activities;
    const wrapper = shallow(
      <SubContractorActivityForm 
      fields={state}
      totalCount={state.length}
      deleteActivity={mockCallBack}/>
    );
    const deletebutton = findByTestAtrr(wrapper,'deleteactivity').first();
    deletebutton.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

});
