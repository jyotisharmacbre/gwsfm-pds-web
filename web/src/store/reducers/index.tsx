import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectAddReducer from './projectAddReducer';
import projectOverviewFormReducer from '../ProjectOverviewForm/Reducer';
import lookupReducer from '../Lookups/Reducer';
const allReducer = combineReducers({
  form: reducerForm,
  project: projectAddReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer
});

export default allReducer;
