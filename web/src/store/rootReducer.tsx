import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectDetailReducer from './CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';
import lookupReducer from './Lookups/Reducer';
import localeReducer from '../Translations/Reducer';
import projectPipelineDetailReducer from './pipeline/Reducer';

export default combineReducers<IState>({
  form: reducerForm,
  project: projectDetailReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer,
  locale: localeReducer,
  pipelineGrid: projectPipelineDetailReducer
});
