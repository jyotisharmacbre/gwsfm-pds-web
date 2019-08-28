import { combineReducers } from 'redux';
import { IProjectFormState, IListItemState, IListState } from "./state";
import projectReducer from './ProjectForm/Reducer';
import listItemReducer from './ListItems/Reducer';


export interface  IApplicationState {
 readonly projectFormState: IProjectFormState;
 readonly listState: IListState;
}

export default combineReducers<IApplicationState>({
    projectFormState: projectReducer,
    listState: listItemReducer
});