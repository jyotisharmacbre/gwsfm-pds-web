import React from 'react';
import { mount } from 'enzyme';
import {store} from '../../store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewSubmit from '../ReviewSubmit';
import { findByTestAtrr, checkProps } from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import configureStore from 'redux-mock-store';
import { initialState as projectInitialState } from '../../store/CustomerEnquiryForm/InitialState';
import { initialState as subContractorState } from '../../store/SubContractor/InitialState';
import { initialState as preliminaryState } from '../../store/Preliminaries/InitialState';
import { initialState as discountState } from '../../store/DiscountForm/InitialState';
import ProjectStatus from '../../enums/ProjectStatus';

const history = { push: jest.fn() };
const mockStore = configureStore([ thunk ]);
let wrapper;
const mountComponent = () => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<ReviewSubmit history={history} match={{ params: { projectId: 1 } }} />
			</IntlProvider>
		</Provider>
	);
};

describe('review and approve component test cases', () => {
	beforeEach(() => {
		//setUpStore(projectInitialState);
		mountComponent();
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should renders the component', () => {
		expect(findByTestAtrr(wrapper, 'review-approve-component')).toBeDefined();
	});

	it('should redirect to discount page on previous button click', () => {
		const button = findByTestAtrr(wrapper, 'previous-button');
		button.simulate('click');
		expect(history.push).toHaveBeenLastCalledWith('/Discounts/1');
	});

	it('should renders the pricing summary component', () => {
		expect(findByTestAtrr(wrapper, 'pricing-summary')).toBeDefined();
	});

	it('should renders the calculation summary component', () => {
		expect(findByTestAtrr(wrapper, 'calculation-summary')).toBeDefined();
	});

	it('should enable the submit button when state is not InReview', () => {
		expect(wrapper.find('.link_disabled').length).toEqual(0);
	});

	it('should disable the submit button when state is InReview', () => {
		// let data = { ...projectInitialState };
		 projectInitialState.form.status = ProjectStatus.InReview;
		// setUpStore(data);
		mountComponent();
		expect(wrapper.find('.link_disabled').length).toBeGreaterThan(0);
	}); 
});
