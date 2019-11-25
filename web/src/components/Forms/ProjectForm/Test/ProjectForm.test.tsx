import React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectForm from '../ProjectForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
describe('ProjectForm Fields', () => {
  let wrapper: any;

  const props: any = {
    handleSubmit: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
          <ProjectForm {...props} />
        </IntlProvider>
      </Provider>
    );
  });

  it('defines the component', () => {
    expect(wrapper).toBeDefined();
  });
  it('renders form component', () => {
    expect(wrapper.find('[form="ProjectForm"]').first()).toHaveLength(1);
  });

  describe('Defines form fields', () => {
    let field: ShallowWrapper;
    describe('Project field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="name"]').first();
      });
      it('Should renders Project field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Project is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Company field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="companyId"]').first();
      });
      it('Should renders Company field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Company is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(2);
      });
    });
    describe('Contract field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="contractorId"]').first();
      });
      it('Should renders Contract field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Contract is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(3);
      });
    });
    describe('Head of project field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="headOfProject"]').first();
      });
      it('Should renders Head of project field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Head of project is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(4);
      });
    });
    describe('Project Owner field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="projectOwner"]').first();
      });
      it('Should renders Project Owner field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Project Owner is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(5);
      });
    });
    describe('Project Manager field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="projectManager"]').first();
      });
      it('Should renders Project Manager field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Project Manager is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(6);
      });
    });
    describe('Project scope', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="scope"]').first();
      });
      it('Should renders Project scope field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when Project scope is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(7);
      });
    });

    describe('Probability of wining field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="probabilityOfWinning"]').first();
      });
      it('Should renders Probability of wining field', () => {
        expect(field.prop('type')).toBe('number');
      });
      it('Shows error when Probability of wining is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('Approximate value field', () => {
      let field: ShallowWrapper;
      beforeEach(() => {
        field = wrapper.find('input[name="approxValue"]').first();
      });
      it('Should renders Approximate value field', () => {
        expect(field.prop('type')).toBe('number');
      });
      it('Shows error when Approximate value is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(9);
      });
    });
    describe('Next button', () => {
        beforeEach(() => {
          field = wrapper.find('button[name="next"]').first();
        });
        it('Should renders next button', () => {
          expect(field.prop('type')).toBe('submit');
        });
      });
  });

});
