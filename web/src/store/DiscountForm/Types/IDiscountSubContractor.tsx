export default interface IDiscountSubContractor {
    subContractorDiscountId: string;
    projectId: string;
    supplierName: string;
    supplierState: string;
    supplierTotalDiscount: number | undefined;
    supplierComments: string;
}
