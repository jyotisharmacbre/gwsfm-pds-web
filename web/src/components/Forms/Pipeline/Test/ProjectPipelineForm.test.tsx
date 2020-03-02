import React from 'react';
import nock from 'nock';
import { baseURL, userServiceURL } from '../../../../client/client';
import { getUsersEmailData, pipelineGridData, intialLookupvalues, customerContractList } from './ProjectPipelineFormTestData';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { MemoryRouter } from 'react-router';
import ProjectPipelineForm from '../ProjectPipelineForm';
import { ActionType } from '../../../../store/pipeline/Types/ActionType';
import projectPipelineDetailReducer, { initialState } from '../../../../store/pipeline/Reducer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
nock(baseURL)
  .get('/api/Projects/Getall')
  .reply(200, pipelineGridData);

nock(userServiceURL)
  .post('/api/users/getusernamesforemailids')
  .reply(200, getUsersEmailData);
let store;
const setUpStore = (pipelineGridData) => {
  store = mockStore({
    pipelineGrid: pipelineGridData
  });
};
let props = {
  pipelineValues: pipelineGridData,
  lookupValues: intialLookupvalues,
  userNamesForEmailsValues: getUsersEmailData,
  contractCustomerList: customerContractList
};

describe('Dashboard Form testCases', () => {
  let wrapper: any;

  const componentMount = props => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <MemoryRouter>
            <ProjectPipelineForm {...props} />
          </MemoryRouter>
        </IntlProvider>
      </Provider>
    );
  };

  it('Defines the component', () => {
    setUpStore(pipelineGridData);
    componentMount({ props });
    expect(wrapper).toBeDefined();
  });
  it('should match the snapshot', () => {
    setUpStore(pipelineGridData);
    componentMount({ props });
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Dashboard form reducer', () => {
  it('should handle Get PROJECT DASHBOARD GRID DETAILS successfully', () => {
    const projectPipelineGridAction: any = {
      type: ActionType.PROJECT_PIPELINE_GRID_DETAILS
    };
    expect(
      projectPipelineDetailReducer(initialState, projectPipelineGridAction)
    ).toMatchSnapshot();
  });
});