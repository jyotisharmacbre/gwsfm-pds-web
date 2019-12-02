import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IProjectAdditionalDetail } from '../ProjectOverviewForm/Types/IProjectAdditionalDetail';
import moment from 'moment';
import EventType from '../../enums/EventType';

export const addNewActivity = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type:ActionType.SUB_CONTRACTOR_ADD_NEW_ACTIVITY
    });
  };
};

export const deleteActivity = (index:number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type:ActionType.SUB_CONTRACTOR_DELETE_ACTIVITY,
      payload:index
    });
  };
};
