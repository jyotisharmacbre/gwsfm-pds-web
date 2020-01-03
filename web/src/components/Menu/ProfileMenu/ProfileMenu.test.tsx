import React from 'react';
import ReactDOM from 'react-dom';
import ProfileMenu from './ProfileMenu';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { store } from '../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import { BrowserRouter } from 'react-router-dom';
import * as helper from '../../../helpers/auth-helper';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


export const findByTestAtrr = (component: any, attr: string) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

describe('Profile Menu', () => {
  let store;
  let wrapper;
  let props: any = {
    userPreferences: {},
    languageId: 1,
    languageName: 'en',
    currencyId: 1,
    currencySymbol: '$',
    currencyName: 'dollor',
    currencies: null,
    languages: null,
    notify: '',
    displayName: 'TestName',
    displayEmail: 'TestEmail'
  };
  beforeEach(() => {
    jest.mock('jwt-decode', () => jest.fn().mockReturnValue({
      exp: 12345,
      somethingElse: 'test_value'
    }));

    const getDisplayEmail = jest.mock(
      '../../../helpers/auth-helper'
    );

    const getDisplayName = jest.mock(
      '../../../helpers/auth-helper'
    );

    const getFirstName = jest.mock(
      '../../../helpers/auth-helper'
    );

    const logOut = jest.mock(
      '../../../helpers/auth-helper'
    );

    jest
      .spyOn(helper, 'getDisplayEmail')
      .mockImplementationOnce(() => {
        return 'testEmail';
      });
    jest
      .spyOn(helper, 'logOut')
      .mockImplementationOnce(() => {
        return 'logout';
      });
    jest
      .spyOn(helper, 'getFirstName')
      .mockImplementationOnce(() => {
        return 'testFirstName';
      });
    jest
      .spyOn(helper, 'getDisplayName')
      .mockImplementationOnce(() => {
        return 'testName';
      });

    store = mockStore({
      userPreferences: { preferences: {} },
      lookup: {}
    });
    jest.mock('react-router-dom', () => ({
      useHistory: jest.fn().mockReturnValue({
        length: 13,
        push: jest.fn(),
        block: jest.fn(),
        createHref: jest.fn(),
        go: jest.fn(),
        goBack: jest.fn(),
        goForward: jest.fn(),
        liten: jest.fn(),
        replace: jest.fn(),
        action: "REPLACE",
        location: null
      }),
    }));

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <BrowserRouter>
            <ProfileMenu {...props} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  });


  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should contain menu', () => {
    const field = findByTestAtrr(wrapper, 'menu-container').first();
    expect(field).toBeDefined();
  });

  it('should hide menu onload', () => {
    const field = findByTestAtrr(wrapper, 'menu-container').first();
    expect(field.hasClass('hide')).toBeTruthy;
  });

  it('should show menu onclick', () => {
    const field = findByTestAtrr(wrapper, 'menu-container').first();
    field.simulate('click');
    expect(field.hasClass('show')).toBeTruthy;
  });

  it('should hide menu onblur', () => {
    const field = findByTestAtrr(wrapper, 'menu-container').first();
    field.simulate('click');
    field.simulate('blur');
    expect(field.hasClass('hide')).toBeTruthy;
  });
});
