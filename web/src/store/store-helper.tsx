import { store } from './index';
import ProjectStatus from '../enums/ProjectStatus';

export const isProjectStateInReview = () => {
	return store.getState().project.form.status == ProjectStatus.InReview ? true : false;
};

export const isDataExists = (cache:boolean,storeId:string,value:string) => {
	let exists : boolean = false;
	if(cache && storeId && storeId == value)
		exists = true;
	return exists;
};
