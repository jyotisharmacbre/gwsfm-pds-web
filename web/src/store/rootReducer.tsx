import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectDetailReducer from './CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';
import lookupReducer from './Lookups/Reducer';
import subContractorReducer from './SubContractor/Reducer';
import projectPipelineDetailReducer from './pipeline/Reducer';
import userServiceReducer from './UserService/Reducer';
import dynamicDataReducer from './DynamicsData/Reducer';
import discountFormReducer from './DiscountForm/Reducer';
import preliminaryReducer from './Preliminaries/Reducer';
import DashboardGridDetailReducer from './Dashboard/Reducer';
import userPreferencesFormReducer from './UserPreferencesForm/Reducer';
import adminReducer from './Admin/Reducer';
import authReducer from './Auth/Reducer';
import notificationReducer from './Notifications/Reducer';

export default combineReducers<IState>({
	form: reducerForm,
	project: projectDetailReducer,
	projectOverview: projectOverviewFormReducer,
	lookup: lookupReducer,
	subContractor: subContractorReducer,
	pipelineGrid: projectPipelineDetailReducer,
	dynamicData: dynamicDataReducer,
	userService: userServiceReducer,
	discount: discountFormReducer,
	preliminary: preliminaryReducer,
	dashboardGrid: DashboardGridDetailReducer,
	userPreferences: userPreferencesFormReducer,
	admin: adminReducer,
	auth: authReducer,
	notifications: notificationReducer
});
