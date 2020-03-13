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
import { findByTestAtrr } from '../../../../helpers/test-helper';
import EventType from '../../../../enums/EventType';

nock(baseURL).get('/api/Projects/1/additionalDetails').reply(200, getProjectOverviewData);

nock(baseURL).put('/api/Projects/additionalDetails').reply(201, getProjectOverviewData);

nock(baseURL).post('/api/Projects/additionalDetails').reply(200, 'Project addition details created successfully');

let wrapper: any;
let props: any = {
	handleSubmit: jest.fn(),
	countryCode: 'GBP',
	insuranceRate: -1,
	onPrevious: jest.fn(),
	onNext: jest.fn(),
	onSave: jest.fn(),
	loading: false,
	event: EventType.none

};

let mountComponent = (props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<ProjectOverviewForm {...props} />
			</IntlProvider>
		</Provider>
	);
}

describe('ProjectOverviewForm Fields', () => {

	beforeEach(() => {
		const formatMessage = jest.mock('./../../../../Translations/connectedIntlProvider');

		jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
			return 'intlmessage';
		});


	});
	it('Defines the component', () => {
		mountComponent(props);
		expect(wrapper).toBeDefined();
	});

	describe('Dfines the Form', () => {
		let form: ShallowWrapper;
		beforeEach(() => {
			mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
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
				mountComponent(props);
				field = wrapper.find('button[name="next"]').first();
			});
			it('Should renders next button', () => {
				expect(field.prop('type')).toBe('button');
			});
			it('Should focus on mainContractor name field on click of next button when field is empty and required', () => {
				field.simulate('click');
				let nameField = wrapper.find('input[name="projectAdditionalDetail.mainContractor"]').first();
				const focusedElement = document.activeElement;

				expect(nameField.matchesElement(focusedElement)).toBeTruthy;
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
					mountComponent(props);
					let field = wrapper.find(`input[name="projectAdditionalDetail.projectRisk${fieldCount}"]`).first();
					expect(field.prop('type')).toBe('text');
				});
			}
		});

		describe('Project Risk Control Measure form fields', () => {
			for (let fieldCount = 1; fieldCount <= 3; fieldCount++) {
				it(`Should renders ProjectRiskControlMeasure${fieldCount} field`, () => {
					mountComponent(props);
					let field = wrapper
						.find(`input[name="projectAdditionalDetail.projectRiskControlMeasure${fieldCount}"]`)
						.first();
					expect(field.prop('type')).toBe('text');
				});
			}
		});
		describe('Previous button', () => {
			beforeEach(() => {
				mountComponent(props);
				field = wrapper.find('button[name="previous_button"]');
			});
			it('Should renders previous button', () => {
				expect(field.prop('type')).toBe('button');
			});

			it('Should call the OnPrevious event on previous button click', () => {
				field.simulate('click');
				expect(props.onPrevious).toBeCalledTimes(1);
			});
		});
		describe('Save button', () => {
			it('Should renders saves button', () => {
				mountComponent(props);
				field = findByTestAtrr(wrapper, 'save').first();
				expect(field.prop('type')).toBe('button');
			});

			it('Should call the OnSave event on save button click', () => {
				props.event = EventType.save;
				mountComponent(props);
				field = wrapper.find('button[name="save"]');
				field.simulate('click');
				expect(props.handleSubmit.mock.calls.length).toBeGreaterThan(0);
			});
		});
		describe('Next button', () => {
			it('Should renders next button', () => {
				mountComponent(props);
				field = findByTestAtrr(wrapper, 'next').first();
				expect(field.prop('type')).toBe('button');
			});

			it('Should call the OnNext event on next button click', () => {

				props.event = EventType.next;
				mountComponent(props);
				field = wrapper.find('button[name="next"]');
				field.simulate('click');
				expect(props.handleSubmit.mock.calls.length).toBeGreaterThan(0);
			});
		});
	});


})
