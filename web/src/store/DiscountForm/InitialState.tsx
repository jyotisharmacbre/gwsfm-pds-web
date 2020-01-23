import { IDiscountState } from './Types/IDiscountState';
import Notify from '../../enums/Notify';
import EventType from '../../enums/EventType';
import IDiscountSubContractor from './Types/IDiscountSubContractor';

export const newSubContractorDiscount: IDiscountSubContractor = {
  subContractorDiscountId: '',
  projectId: '',
  supplierName: '',
  supplierState: '',
  supplierTotalDiscount: undefined,
  supplierComments: '',
}

export const initialState: IDiscountState = {
  form: {
    projectId: '',
    clientDiscount: {
      discountId: '',
      projectId: '',
      discount: undefined,
      clientState: '',
      discountType: 1,
      clientComments: ''
    },
    subContractorDiscounts: [{ ...newSubContractorDiscount }],
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};