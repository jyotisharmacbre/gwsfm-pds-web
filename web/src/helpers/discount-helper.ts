import DiscountType from '../enums/DiscountType';
import { restrictMinusAndAllowDecimalForMaxRangeHundred, restrictMinusAndAllowDecimal } from '../helpers/utility-helper';

const normalizeClientDiscount = (discountType: DiscountType, discountValue) => {
    let updatedDiscount;
    if (discountType === DiscountType.Percent) {
        updatedDiscount = restrictMinusAndAllowDecimalForMaxRangeHundred(discountValue);
    }
    else updatedDiscount = restrictMinusAndAllowDecimal(discountValue);
    return updatedDiscount;
}

export default normalizeClientDiscount;