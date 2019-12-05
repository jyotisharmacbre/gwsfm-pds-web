import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';

export const DiscountFormProps = {
    discountId: '',
    projectId: '123',
    supplierName: 'Test',
    supplierState: 'Test',
    supplierTotalDiscount: 123,
    supplierComments: 'Test',
    clientState: 'Test',
    discountType: 1,
    clientDiscount: 1,
    clientComments: 'Test'
    };
    

export const getdiscountFormData = {
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

    export const initialState = {
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
    
