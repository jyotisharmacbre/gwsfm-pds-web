import React from 'react';
import { shallow } from 'enzyme';
import PreliminaryComponentsForm from '../PreliminaryComponentsForm';
import { preliminariuserData, preliminaryComponentIdList } from './PreliminaryFormTestData';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { initialState } from '../../../../store/Preliminaries/InitialState';

describe('Preliminary Components Form test cases', () => {
  let wrapper: any;
  const props: any = {
    submitHandler: jest.fn(),
    onToggleEvent: jest.fn(),
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    initialState.preliminaryDetails = preliminariuserData;
    wrapper = shallow(
      <PreliminaryComponentsForm
        fields={initialState.preliminaryDetails}
        submitHandler={props.submitHandler}
        handleSubmit={props.handleSubmit}
        onToggleEvent={props.onToggleEvent}
        prelimData={initialState.preliminaryDetails}
        componentIdList={preliminaryComponentIdList}
        currencySymbol="$"
        isExpand="false"
      />
    );
  });

  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render toggle button event on click of component collapse icon', () => {
    const button = findByTestAtrr(wrapper, 'collapse').first();
    button.simulate('click');
    expect(props.onToggleEvent.mock.calls.length).toEqual(1);
  });
  it('should render save button once for each components', () => {
    const button = findByTestAtrr(wrapper, 'componentSave');
    expect(button.length).toEqual(1);
  });
  it('should collapse the item component on click of component collapse icon', () => {
    const button = findByTestAtrr(wrapper, 'collapse').first();
    const toggle = findByTestAtrr(wrapper, 'toggle');
    button.simulate('click');
    expect(props.onToggleEvent.mock.calls.length).toEqual(2);
  });
  it('should render check-mark if preliminariuserData item has id', () => {
    const collapseContainer = findByTestAtrr(wrapper, 'tickWrap').first();
    const checkBox = collapseContainer.find('.tick_wrap');
    expect(checkBox).toHaveLength(1);
  });
});
