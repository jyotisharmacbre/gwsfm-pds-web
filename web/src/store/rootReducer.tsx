import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectDetailReducer from './CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';
import lookupReducer from './Lookups/Reducer';
import localeReducer from '../Translations/Reducer';
import projectPipelineDetailReducer from './pipeline/Reducer';
import userServiceReducer from './UserService/Reducer';
import dynamicDataReducer from './DynamicsData/Reducer';

import preliminaryReducer from './Preliminaries/Reducer';
export default combineReducers<IState>({
  form: reducerForm,
  project: projectDetailReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer,
  pipelineGrid: projectPipelineDetailReducer,
  locale: localeReducer,
  UserService: userServiceReducer,
  dynamicData: dynamicDataReducer,
  adData: userServiceReducer,
  preliminary: preliminaryReducer
});
