import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import SubContractorForm from '../SubContractorForm';
import {initialState} from '../../../../store/SubContractor/InitialState';
import {ActionType} from '../../../../store/SubContractor/Types/ActionType';
import subContractorReducer from '../../../../store/SubContractor/Reducer';
import {findByTestAtrr} from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../../../../store/rootActions';
describe('Sub Contractor Activity Form tests', () => {
  const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
  };
  const mockStore = configureStore([]);
  let store;
  let wrapper;
  let state = {...initialState};
  let field: ShallowWrapper;
  const dispatch = jest.fn();
  const props: any = {
    onSubmitForm : jest.fn(),
    addNewActivity: jest.fn(),
    deleteActivity: jest.fn()
  }; 
  beforeEach(() => {
    store = mockStore({
      form: formReducer,
      subContractor: initialState
    });
    wrapper = mount(
      <Provider store={store}>
      <IntlProvider locale="en" messages={translations['en'].messages}>
      <SubContractorForm {...props}/>
      </IntlProvider>
      </Provider>
    );
  });
  
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  }); 
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test previous button click event', () => {
    const button = findByTestAtrr(wrapper,'previous-click').first();
    button.simulate('click');
    expect(props.onSubmitForm.mock.calls.length).toEqual(1);
  });

it('test save button click event', () => {
    const button = findByTestAtrr(wrapper,'save-click').first();
    button.simulate('click');
    expect(props.onSubmitForm.mock.calls.length).toEqual(2);
  });
  it('test next click event', () => {
    const button = findByTestAtrr(wrapper,'next-click').first();
    button.simulate('click');
    expect(props.onSubmitForm.mock.calls.length).toEqual(3);
  });
  });
   