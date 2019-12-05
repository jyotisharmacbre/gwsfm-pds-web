import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import SubContractorActivityForm from '../SubContractorActivityForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import {initialState,addActivity} from '../../../../store/SubContractor/InitialState';
import {ActionType} from '../../../../store/SubContractor/Types/ActionType';
import subContractorReducer from '../../../../store/SubContractor/Reducer';
import {findByTestAtrr} from '../../../../helpers/test-helper';

describe('Sub Contractor - Activity Form', () => {
  let wrapper: any;
  const props: any = {
    fields: [],
    mockHandleDelete: jest.fn()
  };
  beforeEach(() => {
    const formatMessage = jest.mock(
      './../../../../Translations/connectedIntlProvider'
    );

    jest
      .spyOn(connectedIntlProvider, 'formatMessage')
      .mockImplementationOnce(() => {
        return 'intlmessage';
      });

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <SubContractorActivityForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('should call mock function when delete button is clicked', () => {
    const tree = shallow(
      <button className="delete_text" onClick={props.mockHandleDelete} />
    );
    tree.simulate('click');
    expect(props.mockHandleDelete).toHaveBeenCalled();
  });
});


describe('SubContractorActivityForm component tests', () => {
const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
  };
  
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

});
