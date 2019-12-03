import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import { IState } from './state';
import projectDetailReducer from './CustomerEnquiryForm/Reducer';
import projectOverviewFormReducer from './ProjectOverviewForm/Reducer';
import lookupReducer from './Lookups/Reducer';
import localeReducer from '../Translations/Reducer';
import subContractorReducer from './SubContractor/Reducer';
import projectPipelineDetailReducer from './pipeline/Reducer';
import userServiceReducer from './UserService/Reducer';
import dynamicDataReducer from './DynamicsData/Reducer';
import discountFormReducer from './DiscountForm/Reducer';

export default combineReducers<IState>({
  form: reducerForm,
  project: projectDetailReducer,
  projectOverview: projectOverviewFormReducer,
  lookup: lookupReducer,
  subContractor: subContractorReducer,
  pipelineGrid: projectPipelineDetailReducer,
  locale: localeReducer,
  UserService: userServiceReducer,
  dynamicData: dynamicDataReducer,
  adData: userServiceReducer,
  discount: discountFormReducer
});
