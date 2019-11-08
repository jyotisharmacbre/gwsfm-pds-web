import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  form: reducerForm,
  user: projectReducer
});

export default rootReducer;
