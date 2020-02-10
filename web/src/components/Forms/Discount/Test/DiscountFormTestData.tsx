import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import IDiscountSubContractor from '../../../../store/DiscountForm/Types/IDiscountSubContractor';
import DiscountType from '../../../../enums/DiscountType';
import { IDiscountActivity } from '../../../../store/DiscountForm/Types/IDiscountActivity';

export const newSubContractorDiscount: IDiscountSubContractor = {
    subContractorDiscountId: '',
    projectId: '',
    supplierName: '',
    supplierState: '',
    supplierTotalDiscount: undefined,
    supplierComments: '',
}

export const DiscountFormProps = (discountType: DiscountType, discountValue: any) => {
    let discount = {
        form: {
            projectId: '123',
            clientDiscount: {
                discountId: '',
                projectId: '123',
                clientState: 'Test',
                discountType: discountType,
                discount: discountValue,
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
    }
    return discount;
}

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

