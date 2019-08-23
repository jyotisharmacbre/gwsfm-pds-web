import { combineReducers } from 'redux';
import { IProjectFormState } from "./state";
import projectReducer from './ProjectForm/Reducer';


export interface  IApplicationState {
 readonly projectFormState: IProjectFormState
}

export default combineReducers<IApplicationState>({
    projectFormState: projectReducer
});