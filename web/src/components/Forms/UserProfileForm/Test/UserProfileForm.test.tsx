import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import UserProfileForm from '../UserProfileForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import UserPreferencesReducer from '../../../../store/UserPreferencesForm/Reducer';
import { ActionType } from '../../../../store/UserPreferencesForm/Types/ActionType';
import nock from 'nock';
import { baseURL } from '../../../../client/client';
import { IUserPreferencesState } from '../../../../store/UserPreferencesForm/Types/IUserPreferencesState';

const initialState: IUserPreferencesState = {
  preferences: {
    userPreferenceId: '',
    languageId: 1,
    languageName: 'en',
    currencyId: 1,
    currencySymbol: '$',
    currencyName: 'Dollar'
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};

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
  let handleEvent = () =>{};
  let closePanel = () =>{};
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
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
        <UserProfileForm onSubmitForm={handleEvent}
                          redirectMenu = {closePanel}
                          currencies={props.currencies}
                          languages={props.languages}
                          displayName= 'userName'
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
    let field: ShallowWrapper;

    describe('languageId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="languageId"]').first();
        wrapper.setProps({
          currencies: [
            { languageId: 1, languageName: 'english' }
          ],
          languageId: 1
        });
      });
      it('Should renders languageId field', () => {
        expect(field.render());
      });
      it('Shows error when languageId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('currencyId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="currencyId"]').first();
        wrapper.setProps({
          currencies: [
            { currencyId: 1, currencySymbol: '$', currencyName: 'dollar' }
          ],
          currencyId: 1
        });
      });
      it('Should renders currencyId field', () => {
        expect(field.render());
      });
      it('Shows error when currencyId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });



    describe('Save button', () => {
      beforeEach(() => {
        field = wrapper.find('a[data-name="save"]').first();
      });
      it('Should renders save button', () => {
        expect(field).toHaveLength(1);
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
