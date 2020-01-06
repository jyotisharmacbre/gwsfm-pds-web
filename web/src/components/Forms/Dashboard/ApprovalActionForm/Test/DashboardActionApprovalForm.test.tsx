import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../../Translations/translation';
import {
  intialDashboardState,
  intialLookupvalues,
  intialUsersEmailsData,
  getDashboardData,
  getUsersEmailData
} from './DashboardActionApprovalFormTestData';
import { reducer as formReducer } from 'redux-form';
import DashboardActionApprovalForm from '../DashboardActionApprovalForm';
import { MemoryRouter } from 'react-router-dom';
import { ActionType } from '../../../../../store/Dashboard/Types/ActionType';
import { initialState } from '../../../../../store/Dashboard/Reducer';
import DashboardGridDetailReducer from '../../../../../store/Dashboard/Reducer';
import nock from 'nock';
import { baseURL, userServiceURL } from '../../../../../client/client';

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
});
// describe('Dashboard form reducer', () => {
//   it('should handle Get PROJECT DASHBOARD GRID DETAILS successfully', () => {
//     const projectDashboardGridAction: any = {
//       type: ActionType.PROJECT_DASHBOARD_GRID_DETAILS
//     };
//     expect(
//       DashboardGridDetailReducer(initialState, projectDashboardGridAction)
//     ).toMatchSnapshot();
//   });
//});
