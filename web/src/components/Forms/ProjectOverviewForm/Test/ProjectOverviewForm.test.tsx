import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectOverviewForm from '../ProjectOverviewForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import App from '../../../../App';
describe('ProjectOverviewForm Fields', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <App {...props}>
          <ProjectOverviewForm {...props} />
        </App>
        </IntlProvider>
      </Provider>
    );
  });
  xit('Defines the component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Dfines the Form', () => {
    let form: ShallowWrapper;
    beforeEach(() => {
      form = wrapper.find('[form="projectOverviewForm"]').first();
    });
    xit('Renders form component', () => {
      expect(form).toHaveLength(1);
    });
  });
  describe('Defines form fields', () => {
    let field: ShallowWrapper;
    describe('Main Contractor field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="mainContractor"]').first();
      });
      xit('Should renders Main Contractor field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Main Contractor is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Enquiry Received From field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="enquiryReceivedFrom"]').first();
      });
      xit('Should renders Enquiry Received From field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Enquiry Received From is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Potential Customer field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="potentialCustomer"]').first();
      });
      xit('Should renders Potential Customer field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Potential Customer is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Credit Check Result field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="creditCheckResult"]').first();
      });
      xit('Should renders Credit Check Result field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Credit Check Result is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Site Address field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="siteAddress"]').first();
      });
      xit('Should renders Site Address field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Site Address is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Form Of Contract field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="formOfContract"]').first();
      });
      xit('Should renders Form Of Contract field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Form Of Contract is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Retention field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="retention"]').first();
      });
      xit('Should renders Retention field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Retention is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Liquidated Damages field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="liquidatedDamages"]').first();
      });
      xit('Should renders Liquidated Damages field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Liquidated Damages is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Insurance field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="insurance"]').first();
      });
      xit('Should renders Insurance field', () => {
        expect(field.prop('type')).toBe('text');
      });
      xit('Shows error when Insurance is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Next button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="next"]').first();
      });
      xit('Should renders next button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });
  });
});
