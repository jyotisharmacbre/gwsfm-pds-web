import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import IDiscountSubContractor from '../../../../store/DiscountForm/Types/IDiscountSubContractor';

export const newSubContractorDiscount: IDiscountSubContractor = {
    subContractorDiscountId: '',
    projectId: '',
    supplierName: '',
    supplierState: '',
    supplierTotalDiscount: undefined,
    supplierComments: '',
}

export const DiscountFormProps = {

    projectId: '123',
    clientDiscount: {
        projectId: '123',
        discountId: '',
        clientState: 'Test',
        discountType: 1,
        discount: 1,
        clientComments: 'Test',
    },
    subContractorDiscounts: [{
        projectId: '123',
        subContractorDiscountId: '1',
        supplierName: 'Test',
        supplierState: 'Test',
        supplierTotalDiscount: 123,
        supplierComments: 'Test',
    }],

}

export const getdiscountFormData = {
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

export const initialState = {
    form: {
        projectId: '123',
        clientDiscount: {
            discountId: '',
            projectId: '123',
            clientState: 'Test',
            discountType: 1,
            discount: 1,
            clientComments: 'Test',
        },
        subContractorDiscounts: [{
            subContractorDiscountId: '',
            projectId: '123',
            supplierName: 'Test',
            supplierState: 'Test',
            supplierTotalDiscount: 1,
            supplierComments: 'Test',
        }],
    },
    error: null,
    loading: false,
    notify: Notify.success,
    event: EventType.save
};

