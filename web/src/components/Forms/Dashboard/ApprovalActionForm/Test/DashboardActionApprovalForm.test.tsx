import { mount } from 'enzyme';
import nock from 'nock';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { baseURL, userServiceURL } from '../../../../../client/client';
import { store } from '../../../../../store';
import DashboardGridDetailReducer, { initialState } from '../../../../../store/Dashboard/Reducer';
import { ActionType } from '../../../../../store/Dashboard/Types/ActionType';
import translations from '../../../../../Translations/translation';
import DashboardActionApprovalForm from '../DashboardActionApprovalForm';
import { getDashboardData, getUsersEmailData, intialDashboardState, intialLookupvalues, intialUsersEmailsData } from './DashboardActionApprovalFormTestData';


nock(baseURL)
  .get('/api/users/pendingApprovals')
  .reply(200, getDashboardData);

nock(userServiceURL)
  .post('/api/users/getusernamesforemailids')
  .reply(200, getUsersEmailData);
let props = {
  actionApprovalValues: intialDashboardState.actionApprovalDetails.map(a =>
    Object.assign({}, a)
  ),
  showValues: 5,
  lookupValues: intialLookupvalues,
  userNamesForEmailsValues: intialUsersEmailsData
};
describe('Dashboard Form testCases', () => {
  let wrapper: any;
  const componentMount = props => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <MemoryRouter>
            <DashboardActionApprovalForm {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  };

  it('Defines the component', () => {
    componentMount({ props });
    expect(wrapper).toBeDefined();
  });
  it('should match the snapshot', () => {
    componentMount({ props });
    expect(wrapper).toMatchSnapshot();
  });
  it('should insert pending class', () => {
    componentMount(props);
    expect(wrapper.find('.status_pending')).toHaveLength(1);
  });
});

describe('Dashboard form reducer', () => {
  it('should handle Get PROJECT DASHBOARD GRID DETAILS successfully', () => {
    const projectDashboardGridAction: any = {
      type: ActionType.PROJECT_DASHBOARD_GRID_DETAILS
    };
    expect(
      DashboardGridDetailReducer(initialState, projectDashboardGridAction)
    ).toMatchSnapshot();
  });

  it('should handle PROJECT DASHBOARD GRID ERROR successfully', () => {
    const projectDashboardGridErrorAction: any = {
      type: ActionType.PROJECT_DASHBOARD_GRID_ERROR,
      payload: { error: true }
    };
    expect(
      DashboardGridDetailReducer(initialState, projectDashboardGridErrorAction)
    ).toMatchSnapshot();
  });

  it('should handle Get RESET DASHBOARD STATE successfully', () => {
    const projectDashboardGridResetStateAction: any = {
      type: ActionType.RESET_DASHBOARD_STATE
    };
    expect(
      DashboardGridDetailReducer(initialState, projectDashboardGridResetStateAction)
    ).toMatchSnapshot();
  });
});