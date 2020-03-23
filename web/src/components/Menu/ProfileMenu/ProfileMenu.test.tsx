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
import { findByTestAtrr } from '../../../helpers/test-helper';
import routeData from 'react-router';
import Notify from '../../../enums/Notify';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Menu', () => {
  let store;
  let wrapper;

  const mockhistory = (pathname: string) => {
    let history: any = {
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
      location: {
        pathname: pathname
      }
    }
    jest.spyOn(routeData, 'useHistory').mockReturnValue(history);
  };

  const mountProfileMenuComponent = (Props) => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <BrowserRouter>
            <ProfileMenu {...props} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  };
  const mockHelper = () => {
    jest
      .spyOn(helper, 'getDisplayEmail')
      .mockImplementationOnce(() => {
        return 'testEmail';
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

  };

  const mockingStore = () => {
    store = mockStore({
      userPreferences: { preferences: {}, notify: Notify.success },
      lookup: {},
      userService: { currentUserProfile: { displayName: 'testName', email: 'test@pds.com' } },
      project: { form: { name: "testName" } },
      auth: { token: '1234' },
      notifications: { notifications: [] }
    });
  };

  const mockJWT = () => {
    jest.mock('jwt-decode', () => jest.fn().mockReturnValue({
      exp: 12345,
      somethingElse: 'test_value'
    }));
  };


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
    displayEmail: 'TestEmail',
    auth: { token: '' }

  };
  beforeEach(() => {

    mockJWT();
    mockHelper();
    mockingStore();
    mockhistory('/');
    mountProfileMenuComponent(props);
  });


  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should contain menu', () => {
    const field = findByTestAtrr(wrapper, 'menu-container').first();
    expect(field).toBeDefined();
  });

  it('should contain Project Title', () => {
    const projectTitle = wrapper.find('.project_name_title');
    expect(projectTitle).toBeDefined();
  });

  xit('should contain Project Title', () => {
    const text = wrapper.find('.project_name_title').find('label').text();
    expect(text).toEqual('# testName');
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


  describe('Check logo when navigating to page', () => {
    let navList =
      [{ page: '/Error', expectedResult: true },
      { page: '/error', expectedResult: true },
      { page: '/Pipeline', expectedResult: true },
      { page: '/pipeline', expectedResult: true },
      { page: '/test', expectedResult: false }];

    navList.forEach(nav => {
      it(`should have value ${nav.expectedResult} for has class logo for page ${nav.page}`, () => {
        mockJWT();
        mockHelper();
        mockingStore();
        mockhistory(nav.page);
        mountProfileMenuComponent(props);
        const field = findByTestAtrr(wrapper, 'test-logo').first();
        expect(field.hasClass('d-md-block logo')).toEqual(nav.expectedResult);
      });
    });
  });

  describe('should add col-sm-12 d-flex align-items-center class in case navigating to page', () => {
      it(`should have value true for has class col-sm-12 d-flex align-items-center`, () => {
        mockJWT();
        mockHelper();
        mockingStore();
        //mockhistory(nav.page);
        mountProfileMenuComponent(props);
        const field = findByTestAtrr(wrapper, 'test-content').first();
        expect(field.hasClass('col-sm-12 d-flex align-items-center')).toEqual(true);
      });
    });
});
