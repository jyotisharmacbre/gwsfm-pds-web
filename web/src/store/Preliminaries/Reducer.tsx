import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IPreliminaryState } from './Types/IPreliminaryState';
import Notify from '../../enums/Notify';

const initialState: IPreliminaryState = {
  preliminaryDetails: [
    {
      componentId: '1',
      componentName: 'H & S File Production',
      items: [
        {
          itemId: '1',
          itemName: 'Sub-Contractor',
          itemDetails: {
            nameOfSupplier: 'Rishav',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '2',
          itemName: 'Lump Sum Allowance',
          itemDetails: {
            nameOfSupplier: 'Rishav2',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '3',
          itemName: 'CBRE Labour',
          itemDetails: {
            nameOfSupplier: 'Rishav3',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '4',
          itemName: 'Agency Labour',
          itemDetails: {
            nameOfSupplier: 'Rishav4',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        }
      ]
    },
    {
      componentId: '2',
      componentName: 'Site Setup',
      items: [
        {
          itemId: '1',
          itemName: 'Sub-Contractor',
          itemDetails: {
            nameOfSupplier: 'Rishav',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '2',
          itemName: 'Lump Sum Allowance',
          itemDetails: {
            nameOfSupplier: 'Rishav2',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '3',
          itemName: 'CBRE Labour',
          itemDetails: {
            nameOfSupplier: 'Rishav3',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        },
        {
          itemId: '4',
          itemName: 'Agency Labour',
          itemDetails: {
            nameOfSupplier: 'Rishav4',
            noOfHours: 1,
            hourRate: 1,
            totalCost: 1,
            grossMargin: 1,
            comments: 'string'
          }
        }
      ]
    }
  ],
  projectId: '',
  isVisible: false,
  notify: Notify.none
};
const preliminaryAddSuccess = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.success
  });
};
const preliminaryAddError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryEditSuccess = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.success
  });
};
const preliminaryEditError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryGetSuccess = (oldState, action) => {
  return updateObject(oldState, {
    preliminaryDetails: updateObject(
      oldState.preliminaryDetails,
      action.payload
    ),
    isVisible: false
  });
};
const preliminaryGetError = (oldState, action) => {
  return updateObject(oldState, {
    isVisible: false,
    notify: Notify.error
  });
};
const preliminaryReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PRELIMINARY_ADD_SUCCESS:
      return preliminaryAddSuccess(oldState, action);
    case ActionType.PRELIMINARY_ADD_ERROR:
      return preliminaryAddError(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditSuccess(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditError(oldState, action);
    case ActionType.GET_PRELIMINARY_SUCCESS:
      return preliminaryGetSuccess(oldState, action);
    case ActionType.GET_PRELIMINARY_ERROR:
      return preliminaryGetError(oldState, action);
    case ActionType.EXPAND_PRELIMINARY_COMPONENT: {
      oldState.preliminaryDetails.map((data, index) => {
        if (data.componentId === action.payload) {
          oldState[index].isVisible = true;
          return;
        }
      });
      return (oldState = { ...oldState });
    }
    case ActionType.EXPAND_ALL_PRELIMINARY_COMPONENTS: {
      return { ...oldState, isVisible: true };
    }
    default:
      return oldState;
  }
};
export default preliminaryReducer;
