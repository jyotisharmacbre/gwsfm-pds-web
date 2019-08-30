import { combineReducers } from 'redux';
import { IProjectFormState, IListItemState, IListState, IFilterState } from "./state";
import projectReducer from './ProjectForm/Reducer';
import listItemReducer from './ListItems/Reducer';
import filterReducer from './Filters/Reducer';



export interface  IApplicationState {
 readonly projectFormState: IProjectFormState;
 readonly listState: IListState;
 readonly filtersState: IFilterState;
}

export default combineReducers<IApplicationState>({
    projectFormState: projectReducer,
    listState: listItemReducer,
    filtersState:filterReducer
});