import { shallow } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import translations from '../../../../Translations/translation';
import DiscountSubContractorForm from '../DiscountSubContractorForm';
import * as testData from '../Test/DiscountSubContractorFormTestData';

let wrapper: any;

let props = {
    fields: testData.getSubContractorDiscounts(2),
    currencySymbol: testData.currencySymbol,
    intl: (new IntlProvider({ locale: "en", messages: translations['en'].messages })).state.intl
};

const shallowWrapper = (props) => {
    wrapper = shallow(
        <DiscountSubContractorForm
            {...props}
        />
    );
}

describe('Discount Sub Contractor Form tests', () => {
    beforeEach(() => {
        shallowWrapper(props);
    });

    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('renders the discount SubContractor individual section with no errors', () => {
        expect(findByTestAtrr(wrapper, 'discount-sub-contractor-form').length).toEqual(2);
    });

    it('should renders the delete button when multiple discount', () => {
        expect(findByTestAtrr(wrapper, 'deleteDiscountSubContractor').length).toEqual(2);
    });

    it('should not renders the delete button when only one sub contractor discount', () => {
        props.fields = testData.getSubContractorDiscounts(1);
        shallowWrapper(props);
        expect(findByTestAtrr(wrapper, 'deleteDiscountSubContractor').length).toEqual(0);
    });

    it('test the add addSubContractorDiscount click event', () => {
        let addSubContractorDiscount = findByTestAtrr(wrapper, 'addSubContractorDiscount');
        addSubContractorDiscount.simulate('click');
        wrapper.update();
    });

    it('should disable the new activity button when subcontractor discount length is greater than 5', () => {
        props.fields = testData.getSubContractorDiscounts(5);
        shallowWrapper(props);
        let addSubContractorDiscount = findByTestAtrr(wrapper, 'addSubContractorDiscount');
        wrapper.update();
        expect(addSubContractorDiscount.prop('disabled')).toBe(true);
    });
    it('should show the popup for confirm on delete button click on subcontractor discount', () => {
        let deleteSubContractorDiscountButtons = findByTestAtrr(wrapper, 'deleteDiscountSubContractor');
        deleteSubContractorDiscountButtons.last().simulate('click');
        wrapper.update();
        let doc: any = (document.getElementById('react-confirm-alert'));
        expect(doc.innerHTML).not.toBeNull();
        expect(doc.childElementCount).toBe(1);
    });
});
