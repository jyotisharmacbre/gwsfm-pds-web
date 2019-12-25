import { store } from './index';
import ProjectStatus from '../enums/ProjectStatus';

export const isProjectStateInReview = () => {
	return store.getState().project.form.status == ProjectStatus.InReview ? true : false;
};
