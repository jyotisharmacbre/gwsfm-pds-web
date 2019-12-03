export interface IDiscountActivity {
  discountId: string;
  projectId: string;
  supplierName: string;
  supplierState: string;
  supplierTotalDiscount: number | undefined;
  supplierComments: string;
  clientState: string;
  discountType: number | undefined;
  clientDiscount: number  | undefined;
  clientComments: string;
}
