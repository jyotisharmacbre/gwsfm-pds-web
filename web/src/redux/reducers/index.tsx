import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectAddReducer from './projectAddReducer';

const allReducer = combineReducers({
  form: reducerForm,
  project: projectAddReducer
});

export default allReducer;
