import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from './Types/IProjectAdditionalDetail';
import moment from 'moment';

const projectOverviewFormAddSuccess = (response: any) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
    payload: response
  };
};

const projectOverviewFormEditSuccess = (response: number) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
    payload: response
  };
};

const projectOverviewFormError = (error: string) => {
  return {
    type: ActionType.PROJECT_OVERVIEW_FORM_ERROR,
    payload: error
  };
};

const getAdditionalDetailsSuccess = (response: any) => {
  return {
    type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
    payload: response
  };
};

const getAdditionalDetailsError = (error: string) => {
  return {
    type: ActionType.GET_ADDITIONALS_DETAILS_ERROR,
    payload: error
  };
};
let config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const projectOverviewFormAdd = (
  projectId: string,
  data: IProjectAdditionalDetail
) => {
  debugger;
  data.projectId = projectId;

  let finalData = {
    projectAddDetailId: data.projectAddDetailId,
    projectId: data.projectId,
    mainContractor: data.mainContractor,
    otherMainContractor: data.otherMainContractor,
    enquiryReceivedFrom: data.enquiryReceivedFrom,
    potentialCustomer: data.potentialCustomer,
    otherPotentialCustomer: data.otherPotentialCustomer,
    enquiryTypeId: data.enquiryTypeId,
    creditCheckResult: data.creditCheckResult,
    siteAddress: data.siteAddress,
    formOfContract: data.formOfContract,
    otherFormOfContract: 'string',
    retention: data.retention,
    liquidatedDamages: data.liquidatedDamages,
    insurance: data.insurance,
    workTypeId: data.workTypeId,
    commenceDate: data.commenceDate,
    completionDate: data.completionDate,
    milestones: data.milestones,
    firstValuationDate: data.firstValuationDate,
    finalAccountDate: data.finalAccountDate,
    valuationIntervals: data.valuationIntervals,
    paymentTerms: data.paymentTerms,
    isProjectLive: data.isProjectLive,
    comments: data.comments
  };
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .post('api/Projects/additionalDetails', finalData, config)
      .then(response => {
        dispatch(projectOverviewFormAddSuccess(response.data));
      })
      .catch(error => {
        dispatch(projectOverviewFormError(error));
      });
  };
};

export const getAdditionalDetails = (
  projectId: string
  ) => {
  debugger;
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .get(`api/Projects/${projectId}/additionalDetails`, config)
      .then(response => {
        dispatch(getAdditionalDetailsSuccess(response.data));
      })
      .catch(error => {
        dispatch(getAdditionalDetailsError(error));
      });
  };
};