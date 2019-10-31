import { IFilterState } from '../state';
import { Reducer } from 'redux';

const initialFiltersState: IFilterState = {
  projectname: '',
  customer_client: '',
  owner: '',
  contracttype: '',
  probofwinning: undefined,
  status: '',
  cdmnotifiable: false,
  soldmargin: undefined,
  expectedstartdate: undefined,
  approximatevalue: undefined,
  weightedtcv: undefined,
  validForm: false
};

const filterReducer: Reducer<IFilterState> = (
  state = initialFiltersState,
  action
) => {
  switch (action.type) {
    case 'GetFilterAction': {
      return {
        ...state
      };
    }
    case 'FilterAddAction': {
      return Object.assign({}, state, action.form);
    }

    default:
      return state;
  }
};

export default filterReducer;
