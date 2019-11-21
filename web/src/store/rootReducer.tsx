import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectAddReducer from './reducers/projectAddReducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';

export default combineReducers<IState>({
  form: reducerForm,
  project: projectAddReducer,
  projectOverview: projectOverviewFormReducer
});
