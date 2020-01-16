import React from 'react';
import { mount } from 'enzyme';
import { store } from '../../store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewApprove from '../ReviewApprove';
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
				<ReviewApprove history={history} match={{ params: { projectId: 1 } }} />
			</IntlProvider>
		</Provider>
	);
};

describe('review and approve component test cases', () => {
	beforeEach(() => {
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

	it('should renders the pricing summary component', () => {
		expect(findByTestAtrr(wrapper, 'pricing-summary')).toBeDefined();
	});

	it('should renders the calculation summary component', () => {
		expect(findByTestAtrr(wrapper, 'calculation-summary')).toBeDefined();
	});
	it('should renders the activity feed component', () => {
		expect(findByTestAtrr(wrapper, 'activity-feed-list')).toBeDefined();
	});
});
