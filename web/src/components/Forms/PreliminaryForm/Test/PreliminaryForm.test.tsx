import React from 'react';
import { mount} from 'enzyme';
import { Provider } from 'react-redux';
import {findByTestAtrr} from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { reducer as formReducer } from 'redux-form';
import PreliminaryForm from '../PreliminaryForm';
import {initialState} from "../../../../store/Preliminaries/InitialState"
import { preliminaryComponentIdList } from './PreliminaryFormTestData';

describe('Preliminary Form testCases', () => {
 
  const mockStore = configureStore([]);
  let store;
  let wrapper;
  const props: any = {
    onSave : jest.fn(),
    onToggle: jest.fn(),
    onPrevious:jest.fn(),
    preliminariesDetails:initialState,
    componentIdList:preliminaryComponentIdList

  }; 
  beforeEach(() => {
    store = mockStore({
      form: formReducer,
      preliminaryDetails: initialState
    });
    wrapper = mount(
      <Provider store={store}>
      <IntlProvider locale="en" messages={translations['en'].messages}>
      <PreliminaryForm {...props}/>
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
    const button = findByTestAtrr(wrapper,'previous').first();
    button.simulate('click');
    expect(props.onPrevious.mock.calls.length).toEqual(1);
  });
  it('test next button click event', () => {
    const button = findByTestAtrr(wrapper,'next').first();
    button.simulate('click');
    expect(props.onSave.mock.calls.length).toEqual(1);
  });
  it('test save button click event', () => {
    const button = findByTestAtrr(wrapper,'save').first();
    button.simulate('click');
    expect(props.onSave.mock.calls.length).toEqual(2);
  });
 
  });
