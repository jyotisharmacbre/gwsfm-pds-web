import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectDetailReducer from '../CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from '../ProjectOverviewForm/Reducer';
import lookupReducer from '../Lookups/Reducer';
const allReducer = combineReducers({
  form: reducerForm,
  project: projectDetailReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer
});

export default allReducer;
