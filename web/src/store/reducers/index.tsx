import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectAddReducer from './projectAddReducer';
import projectOverviewFormReducer from '../ProjectOverviewForm/Reducer';
import localeReducer from '../../Translations/Reducer';

const allReducer = combineReducers({
  form: reducerForm,
  project: projectAddReducer,
  projectOverview: projectOverviewFormReducer,
  localeState: localeReducer
});

export default allReducer;
