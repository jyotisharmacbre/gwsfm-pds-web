import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewSubmit from '../ReviewSubmit';
import { findByTestAtrr, checkProps } from '../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../Translations/translation';
import {store} from '../../store';
describe('review and approve component test cases', () => {
	let wrapper: any;
	const history = { push: jest.fn() };
	beforeEach(() => {
	wrapper = mount(
        <Provider store={store}>
        <IntlProvider locale="en" messages={translations['en'].messages}>
        <ReviewSubmit  history={history} match={{ params: { projectId: 1 } }} />
        </IntlProvider>
        </Provider>
      );
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
	
});
