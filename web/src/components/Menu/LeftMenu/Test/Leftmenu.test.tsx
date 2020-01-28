import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import LeftMenu from '../index';
import { leftMenuProjectData } from './LeftMenuTestData';
import { BrowserRouter } from 'react-router-dom';
import ProjectStatus from '../../../../enums/ProjectStatus';

let props: any = {
	projectId: '',
	isProjectFormDirty:false,
	isProjectOverviewFormDirty:false,
	isPreliminaryFormDirty:false,
	isSubContractorFormDirty:false,
	isDiscountFormDirty:false,
	history : { push: jest.fn() }
};
describe('Left Menu Renders', () => {
	const mockStore = configureStore([]);
	let store;
	let wrapper;
	const setUpStore = () => {
		store = mockStore({
			project: leftMenuProjectData
		});
	};
	const renderComponent = (store, props) => {
		wrapper = mount(
			<Provider store={store}>
				<IntlProvider locale="en" messages={translations['en'].messages}>
					<BrowserRouter>
						<LeftMenu {...props} />
					</BrowserRouter>
				</IntlProvider>
			</Provider>
		);
	};
	beforeEach(() => {
		setUpStore();
		jest.mock('react-router-dom', () => ({
			useHistory: jest.fn().mockReturnValue({
				length: 13,
				push: jest.fn(),
				block: jest.fn(),
				createHref: jest.fn(),
				go: jest.fn(),
				goBack: jest.fn(),
				goForward: jest.fn(),
				liten: jest.fn(),
				replace: jest.fn(),
				action: 'REPLACE',
				location: null
			})
		}));
		props.projectId = '';
		leftMenuProjectData.form.projectId = '';
		renderComponent(store, props);
	});
	it('Defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should disable the link if project id is not found', () => {
		const container = findByTestAtrr(wrapper, 'ProjectOverviewLink').first();
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should disable the link if project is not in GUID format inside url', () => {
		window.location.href = 'http://localhost/projectOverview/309ccd02-38ab-4643-1165-08d7';
		const container = findByTestAtrr(wrapper, 'ProjectOverviewLink').first();
		const link = findByTestAtrr(wrapper, 'ProjectOverviewPath').first();
		expect(link.getDOMNode().href).not.toContain('309ccd02-38ab-4643-1165-08d7');
		expect(container.hasClass('link_disabled')).toBe(true);
	});
	it('should enable and pass project id with url if project id is there', () => {
		leftMenuProjectData.form.projectId = '309ccd02-38ab-4643-1165-08d77e00a6ce';
		renderComponent(store, props);
		const container = findByTestAtrr(wrapper, 'ProjectOverviewLink').first();
		const link = findByTestAtrr(wrapper, 'ProjectOverviewPath').first();
		expect(container.hasClass('link_disabled')).toBe(false);
		link.simulate('click'); 
		expect(window.location.href).toContain('309ccd02-38ab-4643-1165-08d77e00a6ce');
	});
	it('should take only first GUID if more than two GUID found in the url', () => {
		leftMenuProjectData.form.projectId = '309ccd02-38ab-4643-1165-08d77e00a6ce';
		window.location.href =
			'http://localhost/projectOverview/309ccd02-38ab-4643-1165-08d77e00a6ce/125ddg11-44dd-6785-2344-17w6';
		renderComponent(store, props);
		
		const link = findByTestAtrr(wrapper, 'ProjectOverviewPath').first();
		expect(window.location.href).toContain('309ccd02-38ab-4643-1165-08d77e00a6ce');
		expect(link.getDOMNode().href).not.toContain('125ddg11-44dd-6785-2344-17w6');
	});

	it('should not render the R&A menu if project status is not InReview', () => {
		expect(findByTestAtrr(wrapper, 'review-approve').length).toEqual(0);
	});
	it('should render the R&A menu if project status is not InReview', () => {
		leftMenuProjectData.form.status = ProjectStatus.InReview;
		renderComponent(store, props);
		expect(findByTestAtrr(wrapper, 'review-approve').length).toEqual(1);
	});
	it('should redirect to component if form is not dirty', () => {
		leftMenuProjectData.form.projectId = '309ccd02-38ab-4643-1165-08d77e00a6ce';
		renderComponent(store, props);
		const link = findByTestAtrr(wrapper, 'ProjectOverviewPath').first();
		link.simulate('click'); 
		expect( window.location.href ).toContain( 'ProjectOverview' );
		expect( window.location.href ).toContain( '309ccd02-38ab-4643-1165-08d77e00a6ce' );
	});
	it('should not redirect to component if form is dirty', () => {
		let prop={isProjectFormDirty:true};
		renderComponent(store,prop);
		leftMenuProjectData.form.projectId = '309ccd02-38ab-4643-1165-08d77e00a6ce';
      const link = findByTestAtrr(wrapper, 'ProjectOverviewPath').first();
		link.simulate('click'); 
	  expect( props.history.push).not.toHaveBeenLastCalledWith( '/ProjectOverview/309ccd02-38ab-4643-1165-08d77e00a6ce' );
	});
	
});
