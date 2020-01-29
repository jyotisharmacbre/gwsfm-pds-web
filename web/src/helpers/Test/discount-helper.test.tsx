import normalizeClientDiscount from '../discount-helper'

describe('discount-helper functions run without error', () => {

    it('should normalized discount based on discount type percent and discount value', () => {
        let result = normalizeClientDiscount(1, 1234);
        expect(result).toEqual(100);
    });

    it('should normalized discount based on discount type value and discount value', () => {
        let result = normalizeClientDiscount(2, 1234);
        expect(result).toEqual('1234');
    });
});
