import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import DiscountForm from '../DiscountForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import nock from 'nock';
import { baseURL } from '../../../../client/client';

nock(baseURL)
  .post('/api/Discounts/adddiscount')
  .reply(200, 'Project added successfully');

// nock(baseURL)
//   .put('/api/Projects/updatecustomerEnquiry')
//   .reply(201, 'Project updated successfully');

// nock(baseURL)
//   .get('/api/Projects/1/enquiryOverview')
//   .reply(200, getprojectDetailData);

describe('Discount form Fields', () => {
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
    describe('Next button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="next"]').first();
      });
      it('Should renders next button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

    describe('Previous button', () => {
        beforeEach(() => {
          field = wrapper.find('button[name="previous"]').first();
        });
        it('Should renders previous button', () => {
          expect(field.prop('type')).toBe('button');
        });
      });

    describe('Save button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="save"]').first();
      });
      it('Should renders save button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

  });
});
