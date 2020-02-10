import React from 'react';
import { mount, shallow } from 'enzyme';
import SubContractorActivityForm from '../SubContractorActivityForm';
import {initialState,newActivity} from '../../../../store/SubContractor/InitialState';
import {ActionType} from '../../../../store/SubContractor/Types/ActionType';
import subContractorReducer from '../../../../store/SubContractor/Reducer';
import {findByTestAtrr} from '../../../../helpers/test-helper';
import configureStore from 'redux-mock-store';
import { reducer as formReducer,reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
 import { IntlProvider } from 'react-intl';
 import translations from '../../../../Translations/translation';
import renderer from "react-test-renderer";

describe('Sub Contractor Activity Form tests', () => {
  const subContractorFormAddAction: any = {
          type: ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
  };
  let wrapper: any;
  const mockStore = configureStore([]);
  let store;
  const Decorated = reduxForm({ form: "subContractorForm" })(SubContractorActivityForm);
  beforeEach(() => {
    store = mockStore({
      form: {
        subContractorForm: {
          values: {
            activities: initialState.form.activities
          }
        }
      }
    }
    );
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <Decorated fields={initialState.form.activities}/>
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
  it('renders the SubContractorActivityForm component with no errors', () => {
    expect(findByTestAtrr(wrapper,'sub-contractor-form').length).toEqual(1);
  });

  it('should not renders the delete button', () => {
    expect(findByTestAtrr(wrapper,'deleteactivity').length).toEqual(0);
  });

  it('test the add activity click event', () => {
    let addActivity = findByTestAtrr(wrapper,'addActivity');
    addActivity.simulate('click');
    wrapper.update();
   });
});
