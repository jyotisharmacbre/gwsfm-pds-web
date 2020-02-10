import IDiscountSubContractor from '../../../../store/DiscountForm/Types/IDiscountSubContractor';

export const getSubContractorDiscounts = (count) => {
    let discountArray: Array<IDiscountSubContractor> = []
    for (let i = 0; i < count; i++) {
        let item: IDiscountSubContractor = {
            projectId: '1',
            subContractorDiscountId: `${i}`,
            supplierName: `test${i}`,
            supplierState: `state${i}`,
            supplierTotalDiscount: i,
            supplierComments: `comment${i}`,
        }
        discountArray.push(item);
    }
    return discountArray;
}

export const currencySymbol = "$";

