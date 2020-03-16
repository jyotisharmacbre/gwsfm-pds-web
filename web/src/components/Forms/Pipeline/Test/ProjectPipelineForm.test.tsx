import { mount } from 'enzyme';
import nock from 'nock';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import { baseURL, userServiceURL } from '../../../../client/client';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import projectPipelineDetailReducer, { initialState } from '../../../../store/pipeline/Reducer';
import { ActionType } from '../../../../store/pipeline/Types/ActionType';
import translations from '../../../../Translations/translation';
import ProjectPipelineForm from '../ProjectPipelineForm';
import { customerContractList, getUsersEmailData, intialLookupvalues, pipelineGridData } from './ProjectPipelineFormTestData';

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

describe('Project Pipline Form testCases', () => {
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

  it('should have the component Project Pipeline Filter', () => {
    setUpStore(pipelineGridData);
    componentMount({ props });
    let ProjectPipelineFilters = findByTestAtrr(wrapper, 'ProjectPipelineFilters')
    expect(ProjectPipelineFilters).toBeDefined();

  });

  it('should have the component DataGrid', () => {
    setUpStore(pipelineGridData);
    componentMount({ props });
    let DataGrid = findByTestAtrr(wrapper, 'DataGrid')
    expect(DataGrid).toBeDefined();

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

});