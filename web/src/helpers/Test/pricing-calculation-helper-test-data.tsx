import IDiscountSubContractor from '../../store/DiscountForm/Types/IDiscountSubContractor';

export const getSubContractorDiscountsWithDiscountAsNumber = (count) => {
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

export const getSubContractorDiscountsWithDiscountAsString = (count) => {
    let discountArray: any = []
    for (let i = 0; i < count; i++) {
        let item = {
            projectId: '1',
            subContractorDiscountId: `${i}`,
            supplierName: `test${i}`,
            supplierState: `state${i}`,
            supplierTotalDiscount: `${i}`,
            supplierComments: `comment${i}`,
        }
        discountArray.push(item);
    }
    return discountArray;
}