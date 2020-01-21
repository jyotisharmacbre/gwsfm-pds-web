import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import ProjectOverviewForm from '../ProjectOverviewForm';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from '../../../../Translations/connectedIntlProvider';
import { ActionType } from '../../../../store/ProjectOverviewForm/Types/ActionType';
import projectOverviewFormReducer from '../../../../store/ProjectOverviewForm/Reducer';
import { initialState, getProjectOverviewData } from './ProjectOverviewFormTestData';
import nock from 'nock';
import { baseURL } from '../../../../client/client';

nock(baseURL).get('/api/Projects/1/additionalDetails').reply(200, getProjectOverviewData);

nock(baseURL).put('/api/Projects/additionalDetails').reply(201, getProjectOverviewData);

nock(baseURL).post('/api/Projects/additionalDetails').reply(200, 'Project addition details created successfully');

describe('ProjectOverviewForm Fields', () => {
	let wrapper: any;
	const props: any = {
		handleSubmit: jest.fn(),
		countryCode: 'GBP',
		insuranceRate: -1
	};
	beforeEach(() => {
		const formatMessage = jest.mock('./../../../../Translations/connectedIntlProvider');

		jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
			return 'intlmessage';
		});

		wrapper = mount(
			<Provider store={store}>
				<IntlProvider locale="en" messages={translations['en'].messages}>
					<ProjectOverviewForm {...props} />
				</IntlProvider>
			</Provider>
		);
	});
	it('Defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	describe('Dfines the Form', () => {
		let form: ShallowWrapper;
		beforeEach(() => {
			form = wrapper.find('[form="projectOverviewForm"]').first();
		});
		it('Renders form component', () => {
			expect(form).toHaveLength(1);
		});
	});
	describe('Defines form fields', () => {
		let field: ShallowWrapper;
		describe('Main Contractor field', () => {
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.mainContractor"]').first();
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
				field = wrapper.find('input[name="projectAdditionalDetail.enquiryReceivedFrom"]').first();
			});
			it('Should renders Enquiry Received From field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Shows error when Enquiry Received From is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(1);
			});
		});
		describe('Credit Check Result field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.creditCheckResult"]').first();
			});
			it('Should renders Credit Check Result field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Shows error when Credit Check Result is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(1);
			});
		});
		describe('Site Address field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.siteAddress"]').first();
			});
			it('Should renders Site Address field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Shows error when Site Address is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(1);
			});
		});
		describe('Form Of Contract field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.formOfContract"]').first();
			});
			it('Should renders Form Of Contract field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Shows error when Form Of Contract is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(1);
			});
		});
		describe('Retention field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.retention"]').first();
			});
			it('Should renders Retention field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Should not show error when Retention is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(0);
			});
		});
		describe('Liquidated Damages field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.liquidatedDamages"]').first();
			});
			it('Should renders Liquidated Damages field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Should not show error when Liquidated Damages is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(0);
			});
		});
		describe('Insurance field', () => {
			let field: ShallowWrapper;
			beforeEach(() => {
				field = wrapper.find('input[name="projectAdditionalDetail.insurance"]').first();
			});
			it('Should renders Insurance field', () => {
				expect(field.prop('type')).toBe('text');
			});
			it('Shows error when Insurance is set to blank', () => {
				field.simulate('blur');
				const errorBlock = wrapper.find('.text-danger');
				expect(errorBlock).toHaveLength(1);
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

		describe('Project form reducer', () => {
			it('should handle get get additional details successfully', () => {
				const getAdditionalDetailsAction: any = {
					type: ActionType.GET_ADDITIONALS_DETAILS_SUCCESS,
					payload: { projectId: '1', projectApprovals: [] }
				};
				expect(projectOverviewFormReducer(initialState, getAdditionalDetailsAction)).toMatchSnapshot();
			});

			it('should handle edit project overview successfully', () => {
				const editProjectOverviewAction: any = {
					type: ActionType.PROJECT_OVERVIEW_FORM_EDIT_SUCCESS,
					payload: initialState.form
				};
				expect(projectOverviewFormReducer(initialState, editProjectOverviewAction)).toMatchSnapshot();
			});

			it('should handle add project overview successfully', () => {
				const addProjectOverviewAction: any = {
					type: ActionType.PROJECT_OVERVIEW_FORM_ADD_SUCCESS,
					payload: initialState.form
				};
				expect(projectOverviewFormReducer(initialState, addProjectOverviewAction)).toMatchSnapshot();
			});

			it('should handle GET_PROJECT_DETAIL_ERROR with and return initialState', () => {
				const getProjectDetailError: any = {
					type: ActionType.PROJECT_OVERVIEW_FORM_ERROR,
					error: { success: false }
				};
				expect(projectOverviewFormReducer(initialState, getProjectDetailError)).toMatchSnapshot();
			});
		});
		describe('Project Risk form fields', () => {
			for (let fieldCount = 1; fieldCount <= 3; fieldCount++) {
				it(`Should renders ProjectRisk${fieldCount} field`, () => {
					let field = wrapper.find(`input[name="projectAdditionalDetail.projectRisk${fieldCount}"]`).first();
					expect(field.prop('type')).toBe('text');
				});
			}
		});

		describe('Project Risk Control Measure form fields', () => {
			for (let fieldCount = 1; fieldCount <= 3; fieldCount++) {
				it(`Should renders ProjectRiskControlMeasure${fieldCount} field`, () => {
					let field = wrapper
						.find(`input[name="projectAdditionalDetail.projectRiskControlMeasure${fieldCount}"]`)
						.first();
					expect(field.prop('type')).toBe('text');
				});
			}
		});
	});
});
