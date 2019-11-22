import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectOverviewForm from '../ProjectOverviewForm';
import { findByTestAtrr, checkProps } from '../../../../helpers/test-helper';
import { required, email } from '../../../../helpers/fieldValidations';
describe('ProjectOverviewForm Fields', () => {
  let wrapper: any;

  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ProjectOverviewForm {...props} />
      </Provider>
    );
  });

  it('defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('renders form component', () => {
    expect(wrapper.find('[form="projectOverviewForm"]').first()).toHaveLength(
      1
    );
  });

  describe('Defines form fields', () => {
    let field: ShallowWrapper;
    describe('Main Contractor field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="mainContractor"]').first();
      });
      it('Should renders Main Contractor field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Main Contractor is set to blank', () => {
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
      it('Should renders Enquiry Received From field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Enquiry Received From is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(2);
      });
    });
    describe('Potential Customer field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="potentialCustomer"]').first();
      });
      it('Should renders Potential Customer field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Potential Customer is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(3);
      });
    });
    describe('Credit Check Result field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="creditCheckResult"]').first();
      });
      it('Should renders Credit Check Result field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Credit Check Result is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(4);
      });
    });
    describe('Site Address field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="siteAddress"]').first();
      });
      it('Should renders Site Address field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Site Address is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(5);
      });
    });
    describe('Form Of Contract field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="formOfContract"]').first();
      });
      it('Should renders Form Of Contract field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Form Of Contract is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(6);
      });
    });
    describe('Retention field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="retention"]').first();
      });
      it('Should renders Retention field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Retention is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(7);
      });
    });
    describe('Liquidated Damages field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="liquidatedDamages"]').first();
      });
      it('Should renders Liquidated Damages field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Liquidated Damages is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(8);
      });
    });
    describe('Insurance field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="insurance"]').first();
      });
      it('Should renders Insurance field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Insurance is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(9);
      });
    });
  });
});
