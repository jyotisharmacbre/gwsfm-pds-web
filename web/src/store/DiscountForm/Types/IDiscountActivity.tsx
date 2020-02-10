import IDiscountSubContractor from '../Types/IDiscountSubContractor'
import IClientDiscount from '../Types/IClientDiscount'

export interface IDiscountActivity {
  projectId: string;
  clientDiscount: IClientDiscount;
  subContractorDiscounts: Array<IDiscountSubContractor>;
}
