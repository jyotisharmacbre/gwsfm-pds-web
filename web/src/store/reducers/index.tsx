import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectOverviewFormReducer from '../ProjectOverviewForm/Reducer';
import localeReducer from '../../Translations/Reducer';
import projectPipelineDetailReducer from '../pipeline/Reducer';

const allReducer = combineReducers({
  form: reducerForm,
  projectOverview: projectOverviewFormReducer,
  localeState: localeReducer,
  pipelineGrid: projectPipelineDetailReducer
});

export default allReducer;
