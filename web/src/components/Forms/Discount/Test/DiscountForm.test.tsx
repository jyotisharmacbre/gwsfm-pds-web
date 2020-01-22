import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import DiscountForm from '../DiscountForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import discountFormReducer from '../../../../store/DiscountForm/Reducer';
import { ActionType } from '../../../../store/DiscountForm/Types/ActionType';
import nock from 'nock';
import { baseURL } from '../../../../client/client';
import { initialState, getdiscountFormData } from './DiscountFormTestData';
import { findByTestAtrr } from '../../../../helpers/test-helper';

nock(baseURL)
  .post('/api/Discounts/adddiscount')
  .reply(200, 'Discount added successfully');

describe('DiscountForm Fields', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    const formatMessage = jest.mock(
      './../../../../Translations/connectedIntlProvider'
    );

    jest
      .spyOn(connectedIntlProvider, 'formatMessage')
      .mockImplementationOnce(() => {
        return 'intlmessage';
      });

    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <DiscountForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });
  it('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Defines the Form', () => {
    let form: ShallowWrapper;
    beforeEach(() => {
      form = wrapper.find('[form="DiscountForm"]').first();
    });
    it('Renders form component', () => {
      expect(form).toHaveLength(1);
    });
  });

  describe('Defines form fields', () => {
    let field: ShallowWrapper;
    describe('Supplier name field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="subContractorDiscounts[0].supplierName"]').first();
      });
      it('Should renders supplier name field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('State field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="subContractorDiscounts[0].supplierState"]').first();
      });
      it('Should renders supplierState field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('supplierTotalDiscount field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="subContractorDiscounts[0].supplierTotalDiscount"]').first();
      });
      it('Should renders supplierTotalDiscount field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('supplierComments field', () => {
      beforeEach(() => {
        field = wrapper.find('textarea[name="subContractorDiscounts[0].supplierComments"]').first();
      });
      it('Should renders supplierComments field', () => {
        expect(field.prop('type')).toBe('textarea');
      });
    });

    describe('clientState field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="clientDiscount.clientState"]').first();
      });
      it('Should renders clientState field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('supplierTotalDiscount value', () => {
      it('should have the supplierTotalDiscount Value calculated in the span', () => {
        field = findByTestAtrr(wrapper, 'supplierTotalDiscountValue');
        expect(field.length).toEqual(1);
      });
    });

    describe('sub contractor discount section', () => {
      it('should verify the sub contractor discount section length', () => {
        field = findByTestAtrr(wrapper, 'discount-sub-contractor-form');
        expect(field.length).toEqual(1);
      });
    });

    describe('Next button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="next"]').first();
      });
      it('Should renders next button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

    describe('previous button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="previous"]').first();
      });
      it('Should renders previous button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

    describe('save button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="save"]').first();
      });
      it('Should renders save button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

    it('should handle add discount successfully', () => {
      const addDiscountData: any = {
        type: ActionType.DISCOUNT_FORM_DATA_ADD
      };
      expect(
        discountFormReducer(initialState, addDiscountData)
      ).toMatchSnapshot();
    });

    it('should handle edit discount successfully', () => {
      const editProjectAction: any = {
        type: ActionType.DISCOUNT_FORM_DATA_EDIT
      };
      expect(
        discountFormReducer(initialState, editProjectAction)
      ).toMatchSnapshot();
    });

  });

});
