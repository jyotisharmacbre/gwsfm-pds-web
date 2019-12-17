import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectDetailReducer from './CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';
import lookupReducer from './Lookups/Reducer';
import subContractorReducer from './SubContractor/Reducer';
import projectPipelineDetailReducer from './pipeline/Reducer';
import userServiceReducer from './UserService/Reducer';
import dynamicDataReducer from './DynamicsData/Reducer';
import discountFormReducer from './DiscountForm/Reducer';
import preliminaryReducer from './Preliminaries/Reducer';
import userPreferencesFormReducer from './UserPreferencesForm/Reducer';

export default combineReducers<IState>({
  form: reducerForm,
  project: projectDetailReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer,
  subContractor: subContractorReducer,
  pipelineGrid: projectPipelineDetailReducer,
  UserService: userServiceReducer,
  dynamicData: dynamicDataReducer,
  adData: userServiceReducer,
  discount: discountFormReducer,
  preliminary: preliminaryReducer,
  userPreferences: userPreferencesFormReducer
});
