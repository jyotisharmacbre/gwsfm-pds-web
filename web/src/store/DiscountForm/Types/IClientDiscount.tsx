export default interface IClientDiscount {
    discountId: string;
    projectId: string;
    clientState: string;
    discountType: number;
    discount: number | undefined;
    clientComments: string;
}
