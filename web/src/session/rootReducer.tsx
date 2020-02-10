import { combineReducers } from 'redux';
import {
  IProjectFormState,
  IListState,
  IFilterState,
  INotificationState
} from './state';
import projectReducer from './ProjectForm/Reducer';
import listItemReducer from './ListItems/Reducer';
import filterReducer from './Filters/Reducer';
import notificationReducer from './Notification/Reducer';

export interface IApplicationState {
  readonly projectFormState: IProjectFormState;
  readonly listState: IListState;
  readonly filtersState: IFilterState;
  readonly notificationState: INotificationState;
}

export default combineReducers<IApplicationState>({
  projectFormState: projectReducer,
  listState: listItemReducer,
  filtersState: filterReducer,
  notificationState: notificationReducer
});
