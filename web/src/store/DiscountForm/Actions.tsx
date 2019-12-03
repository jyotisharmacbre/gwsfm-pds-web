import * as axios from '../../client';
import { ActionType } from './Types/ActionType';
import { Dispatch } from 'redux';
import { IDiscountActivity } from './Types/IDiscountActivity';
import EventType from '../../enums/EventType';

const discountFormAddSuccess = (
  response: IDiscountActivity,
  event: EventType
) => {
  return {
    type: ActionType.DISCOUNT_FORM_DATA_ADD,
    payload: response,
    event: event
  };
};

const discountFormEditSuccess = (
  response: IDiscountActivity,
  event: EventType
) => {
  return {
    type: ActionType.DISCOUNT_FORM_DATA_EDIT,
    payload: response,
    event: event
  };
};

const discountFormError = (error: string) => {
  return {
    type: ActionType.DISCOUNT_FORM_DATA_ERROR,
    payload: error
  };
};

const headers = {
  'Content-Type': 'application/json'
};

export const discountFormAdd = ( projectId: string, data: IDiscountActivity, event: EventType) => {
  return (dispatch: Dispatch) => {
    data.projectId = 'f8b5abfd-0f8a-47bc-03be-08d777a100bc';
    axios.baseAPI
      .post('/api/Discounts/adddiscount', data, { headers: headers })
      .then(response => {
        dispatch(discountFormAddSuccess(response.data, event));
      })
      .catch(error => {
        dispatch(discountFormError(error));
      });
  };
};

export const discountFormEdit = (
  data: IDiscountActivity,
  event: EventType
) => {
  return (dispatch: Dispatch) => {
    axios.baseAPI
      .put('/api/Discounts/UpdateDiscount', data, { headers: headers })
      .then(response => {
        dispatch(discountFormEditSuccess(response.data, event));
      })
      .catch(error => {
        dispatch(discountFormError(error));
      });
  };
};
