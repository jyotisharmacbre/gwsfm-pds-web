import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import UserProfileForm from '../UserProfileForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import UserPreferencesReducer from '../../../../store/UserPreferencesForm/Reducer';
import { ActionType } from '../../../../store/UserPreferencesForm/Types/ActionType';
import nock from 'nock';
import { baseURL } from '../../../../client/client';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { currencies, languages, initialState } from './testData';

nock(baseURL)
  .post('/api/Users/addUserPreferences')
  .reply(200, 'Preferences added successfully');

nock(baseURL)
  .put('/api/Users/updateUserPreferences')
  .reply(201, 'Preferences updated successfully');

nock(baseURL)
  .get('/api/Users/getUserPreferences')
  .reply(200, { languageName: 'en', languageId: 1 });

describe('UserProfileForm Fields', () => {
  let wrapper: any;
  const props: any = {
    onSubmitForm: jest.fn(),
    redirectMenu: jest.fn(),
    displayName: 'userName',
    currencies: currencies,
    languages: languages
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
          <UserProfileForm
            {...props}
          />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Defines the Form', () => {
    let form = wrapper.find('[form="UserProfileForm"]').first();

    expect(form).toHaveLength(1);
  });

  describe('Defines form fields', () => {
    let field: any;

    describe('languageId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="languageId"]').first();
      });
      it('Should renders languageId field', () => {
        expect(field.render());
      });
      it('Should select language from state to french', () => {
        wrapper.setProps({
          languageId: 2
        });
        wrapper.update();
        expect(field.find('option').at(2).instance().selected).toBeTruthy;
      });

      it('Should select language from state to english', () => {
        wrapper.setProps({
          languageId: 1
        });
        wrapper.update();
        expect(field.find('option').at(1).instance().selected).toBeTruthy;
      });

      it('Shows error when languageId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('currency field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="currencyId"]').first();
      });
      it('Should renders currencyId field', () => {
        expect(field.render());
      });
      it('Should select currency from state to frenc', () => {
        wrapper.setProps({
          currencyId: 2
        });
        wrapper.update();
        expect(field.find('option').at(2).instance().selected).toBeTruthy;
      });
      it('Should select currency from state to dollor', () => {
        wrapper.setProps({
          currencyId: 1
        });
        wrapper.update();
        expect(field.find('option').at(1).instance().selected).toBeTruthy;
      });
      it('Shows error when currencyId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });



    describe('Save button', () => {
      beforeEach(() => {
        field = findByTestAtrr(wrapper, 'save').first();
      });
      it('Should renders save button', () => {
        expect(field).toHaveLength(1);
      });

      it('should call save function on button click', () => {
        field.simulate('click');
        expect(props.onSubmitForm.mock.calls.length).toEqual(1);
      });

    });

    describe('Cancel button', () => {
      beforeEach(() => {
        field = findByTestAtrr(wrapper, 'cancel').first();
      });
      it('Should renders cancel button', () => {
        expect(field).toHaveLength(1);
      });

      it('should call save function on button click', () => {
        field.simulate('click');
        expect(props.redirectMenu.mock.calls.length).toEqual(1);
      });

    });

    describe('UserProfile form reducer', () => {
      it('should handle get getUserPreferences successfully', () => {
        const getUserPreferencesAction: any = {
          type: ActionType.USER_PREFERENCES_GET_SUCCESS,
          payload: { languageName: 'french', languageId: 2 }
        };
        expect(
          UserPreferencesReducer(initialState, getUserPreferencesAction)
        ).toMatchSnapshot();
      });

      it('should handle edit userPreferences successfully', () => {
        const editUserPreferencesAction: any = {
          type: ActionType.USER_PREFERENCES_FORM_EDIT_SUCCESS,
          payload: { languageName: 'french', languageId: 2 }
        };
        expect(
          UserPreferencesReducer(initialState, editUserPreferencesAction)
        ).toMatchSnapshot();
      });

      it('should handle add userPreferences successfully', () => {
        const addUserPreferencesAction: any = {
          type: ActionType.USER_PREFERENCES_FORM_ADD_SUCCESS
        };
        expect(
          UserPreferencesReducer(initialState, addUserPreferencesAction)
        ).toMatchSnapshot();
      });

      it('should handle userPreferenceUpdateError with and return initialState', () => {
        const userPreferenceUpdateError: any = {
          type: ActionType.USER_PREFERENCES_FORM_ERROR,
          error: { success: false }
        };
        expect(
          UserPreferencesReducer(initialState, userPreferenceUpdateError)
        ).toMatchSnapshot();
      });
    });
  });
});
