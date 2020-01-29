import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectForm from '../ProjectForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import { IProjectDetailState } from '../../../../store/CustomerEnquiryForm/Types/IProjectDetailState';
import Notify from '../../../../enums/Notify';
import EventType from '../../../../enums/EventType';
import projectDetailReducer from '../../../../store/CustomerEnquiryForm/Reducer';
import { ActionType } from '../../../../store/CustomerEnquiryForm/Types/ActionType';
import nock from 'nock';
import { baseURL } from '../../../../client/client';
import { initialState, getprojectDetailData } from '../ProjectTestData';

nock(baseURL)
  .post('/api/Projects/customerEnquiry')
  .reply(200, 'Project added successfully');

nock(baseURL)
  .put('/api/Projects/updatecustomerEnquiry')
  .reply(201, 'Project updated successfully');

nock(baseURL)
  .get('/api/Projects/1/enquiryOverview')
  .reply(200, getprojectDetailData);

describe('ProjectForm Fields', () => {
  let wrapper: any;
  const props: any = {
    handleSubmit: jest.fn(),
    countries: [{
      countryId: 1,
      name: "Afghanistan",
      code: "AFG",
      isoAlpha2Code: "AF",
      currencyId: 64
    }],
    currencies: [{
      currencyId: 64,
      currencyName: 'en',
      currencySymbol: "$",
      isActive: true
    },
    {
      currencyId: 143,
      currencyName: 'Rs',
      currencySymbol: "R",
      isActive: false
    }]
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
          <ProjectForm {...props} />
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
      form = wrapper.find('[form="ProjectForm"]').first();
    });
    it('Renders form component', () => {
      expect(form).toHaveLength(1);
    });
  });

  describe('Defines form fields', () => {
    let field: ShallowWrapper;
    describe('Project name field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="name"]').first();
      });
      it('Should renders project name field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when project name is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });
    describe('divisionId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="divisionId"]').first();
      });
      it('Should renders divisionId field', () => {
        expect(field.render());
      });
    });

    describe('businessUnitId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="businessUnitId"]').first();
      });
      it('Should renders businessUnitId field', () => {
        expect(field.render());
      });
    });

    describe('ProbabilityOfWinning field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="probabilityOfWinning"]').first();
      });
      it('Should renders probabilityOfWinning field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when probabilityOfWinning is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('ApproxValue field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="approxValue"]').first();
      });
      it('Should renders approxValue field', () => {
        expect(field.prop('type')).toBe('text');
      });
      it('Shows error when approxValue is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('ContractTypeId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="contractTypeId"]').first();
      });
      it('Should renders contractTypeId field', () => {
        expect(field.render());
      });
      it('Shows error when contractTypeId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('currencyId field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="currencyId"]').first();
        wrapper.setProps({
          currencies: [
            { currencyId: 1, currencySymbol: '$', currencyName: 'dollar', isActive: true }
          ],
          currencyId: 1
        });
      });

      it('Should renders currencyId field', () => {
        expect(field.render());
      });
      it('Shows error when currencyId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('country field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="countryId"]').first();
        wrapper.setProps({
          countries: [
            { countryId: 1, name: 'India', code: 'IND', isoAlpha2Code: 'IN' }
          ],
          countryId: 1
        });
      });

      it('Should renders countryId field', () => {
        expect(field.render());
      });
      it('Should change currency on countryId change', () => {
      let fieldCurrency = wrapper.find('select[name="currencyId"]').first();
        field.simulate('change', { target: { value: '1' } })
        wrapper.update();
        expect(fieldCurrency.find('option').at(1).instance().selected).toBeTruthy;

      });
      it('Shows error when countryId is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });


    describe('FirstAssetWorkedOn field', () => {
      beforeEach(() => {
        field = wrapper.find('select[name="firstAssetWorkedOn"]').first();
      });
      it('Should renders firstAssetWorkedOn field', () => {
        expect(field.render());
      });
      it('Shows error when firstAssetWorkedOn is set to blank', () => {
        field.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
      it('Shows error when value in firstAssetWorkedOn is again selected in secondAssetWorkedOn', () => {
        let fieldFirst = wrapper.find('select[name="firstAssetWorkedOn"]').last();
        fieldFirst.simulate('blur');
        let fieldSecond = wrapper.find('select[name="secondAssetWorkedOn"]').last();
        fieldSecond.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
      it('Shows error when value in firstAssetWorkedOn is again selected in thirdAssetWorkedOn', () => {
        let fieldFirst = wrapper.find('select[name="firstAssetWorkedOn"]').last();
        fieldFirst.simulate('blur');
        let fieldThird = wrapper.find('select[name="thirdAssetWorkedOn"]').last();
        fieldThird.simulate('blur');
        const errorBlock = wrapper.find('.text-danger');
        expect(errorBlock).toHaveLength(1);
      });
    });

    describe('Scope field', () => {
      beforeEach(() => {
        field = wrapper.find('textarea[name="scope"]').first();
      });
      it('Should renders scope field', () => {
        expect(field.render());
      });
    });

    describe('soldMargin field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="soldMargin"]').first();
      });
      it('Should renders soldMargin field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('weightedTCV field', () => {
      beforeEach(() => {
        field = wrapper.find('input[name="weightedTCV"]').first();
      });
      it('Should renders weightedTCV field', () => {
        expect(field.prop('type')).toBe('text');
      });
    });

    describe('Comment field', () => {
      beforeEach(() => {
        field = wrapper.find('textarea[name="scope"]').first();
      });
      it('Should renders comment field', () => {
        expect(field.render());
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

    describe('SaveAndClose button', () => {
      beforeEach(() => {
        field = wrapper.find('button[name="saveAndClose"]').first();
      });
      it('Should renders saveAndClose button', () => {
        expect(field.prop('type')).toBe('button');
      });
    });

    describe('Typeahead field', () => {
      beforeEach(() => {
        field = wrapper.find('input[aria-autocomplete="both"]').first();
      });
      it('Should renders Typeahead field', () => {
        expect(field.render());
      });
    });

    describe('Project form reducer', () => {
      it('should handle get projectEnquiryOverview successfully', () => {
        const getProjectEnquiryOverviewAction: any = {
          type: ActionType.GET_ENQUIRY_OVERVIEW_SUCCESS,
          payload: { projectId: '1' }
        };
        expect(
          projectDetailReducer(initialState, getProjectEnquiryOverviewAction)
        ).toMatchSnapshot();
      });

      it('should handle edit project successfully', () => {
        const editProjectAction: any = {
          type: ActionType.PROJECT_EDIT_SUCCESS,
          payload: { projectId: 'TestProjectId' }
        };
        expect(
          projectDetailReducer(initialState, editProjectAction)
        ).toMatchSnapshot();
      });

      it('should handle add project successfully', () => {
        const addProjectAction: any = {
          type: ActionType.PROJECT_ADD
        };
        expect(
          projectDetailReducer(initialState, addProjectAction)
        ).toMatchSnapshot();
      });

      it('should handle GET_PROJECT_DETAIL_ERROR with and return initialState', () => {
        const getProjectDetailError: any = {
          type: ActionType.GET_PROJECT_DETAIL_ERROR,
          error: { success: false }
        };
        expect(
          projectDetailReducer(initialState, getProjectDetailError)
        ).toMatchSnapshot();
      });

      it('Should render in dropdown only currencies which has isActive flag true', () => {     
        let fieldCurrency = wrapper.find('select[name="currencyId"]').first();        
        //Note: Although we are passing only one currency with flag true but testing for length to be 2, becuase we have a default option tag as well.
          expect(fieldCurrency.find('option')).toHaveLength(2);
  
        });
    });
  });
});
