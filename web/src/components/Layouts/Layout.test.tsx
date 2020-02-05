import React from 'react';
import { mount, shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { findByTestAtrr } from '../../helpers/test-helper';
import Layout from './Layout';
import configureMockStore from 'redux-mock-store';
import { initialState } from '../../store/Dashboard/Reducer';
import { initialState as customerEnquiryInitialState } from '../../store/CustomerEnquiryForm/InitialState';

import routeData from 'react-router';
import * as helper from '../../helpers/auth-helper';
import thunk from 'redux-thunk';

let props = {
    Theme: {},
    UseStyles: {}
}
let store;
let wrapper;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

initialState.actionApprovalDetails =
    [{
        name: 'string',
        modifiedBy: 'test@pds.com',
        modifiedOn: 'string',
        approvalStatus: 1,
        projectId: 'string'
    }];
customerEnquiryInitialState.form.projectId = 'id';
customerEnquiryInitialState.form.currencyId = 1;
customerEnquiryInitialState.form.countryId = 1;

const mockingStore = () => {
    store = mockStore({
        userPreferences: { preferences: {} },
        lookup: {},
        userService: { currentUserProfile: { displayName: 'testName', email: 'test@pds.com' } },
        dashboardGrid: initialState,
        project: customerEnquiryInitialState,

    });
};

const mockHelper = () => {
    jest.spyOn(helper, 'getDisplayEmail').mockReturnValue('test1@pds.com');
};
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

const mockContainer = (historyPathName: string) => {
    mockingStore();
    mockhistory(historyPathName);
    mockHelper();
    mountComponent();
}
const mountComponent = () => {
    wrapper = mount(
        <Provider store={store}>
            <IntlProvider locale="en" messages={translations['en'].messages}>
                <Router>
                    <Layout {...props} />
                </Router>
            </IntlProvider>
        </Provider>
    );
};

describe('Layout component test cases', () => {

    it('defines the component', () => {
        mockContainer('/');
        expect(wrapper).toBeDefined();
    });

    it('should have profileMenu Length 1', () => {
        mockContainer('/');
        expect(wrapper.find('ProfileMenu')).toHaveLength(1);
    });
    it('should have body Length 1', () => {
        mockContainer('/');
        expect(wrapper.find('Body')).toHaveLength(1);
    });

    const historyPathNames = ['/', '/Pipeline', '/Error'];
    test.each(historyPathNames)(
        'should not show Nav component if url is from %s the component',
        (pathName) => {
            mockContainer(pathName);
            expect(wrapper.find('Nav')).toHaveLength(0);
        }
    )
    it('should not show Nav component if url is from not from dashboard,pipeline and error the component', () => {
        mockContainer('/Notifications');
        expect(wrapper.find('Nav')).toHaveLength(1);
    });


});