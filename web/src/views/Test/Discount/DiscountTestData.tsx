import { IDiscountState } from "../../../store/DiscountForm/Types/IDiscountState";
import Notify from "../../../enums/Notify";
import EventType from "../../../enums/EventType";

export const discountInitialState: IDiscountState = {
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
    subContractorDiscounts: [{
      subContractorDiscountId: '',
      projectId: '',
      supplierName: '',
      supplierState: '',
      supplierTotalDiscount: undefined,
      supplierComments: '',
    }],
  },
  error: null,
  loading: false,
  notify: Notify.none,
  event: EventType.none
};