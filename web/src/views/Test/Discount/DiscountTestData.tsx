import { IDiscountState } from "../../../store/DiscountForm/Types/IDiscountState";
import Notify from "../../../enums/Notify";
import EventType from "../../../enums/EventType";

export const discountInitialState:IDiscountState={
    form: {
      discountId: '',
      projectId: '',
      supplierName: '',
      supplierState: '',
      supplierTotalDiscount: undefined,
      supplierComments: '',
      clientState: '',
      discountType: 1,
      clientDiscount: undefined,
      clientComments: ''
    },
    error: null,
    loading: false,
    notify: Notify.none,
    event: EventType.none
  };