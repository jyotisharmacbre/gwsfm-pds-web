import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { MemoryRouter } from 'react-router-dom';

let wrapper;
let props = {
	showPage: false
}
const error = new Error('test');
const NullComponent = () => null;
const mountComponent = (props) => {
	wrapper = mount(
		<MemoryRouter>
		<IntlProvider locale="en" messages={translations['en'].messages}>
			<ErrorBoundary {...props}><NullComponent /></ErrorBoundary>
		</IntlProvider>
		</MemoryRouter>);
	};
describe('Error boundary test cases', () => {
	beforeEach(() => {
		mountComponent(props);
	});
	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should not render error message when their is no error', () => {
		expect(findByTestAtrr(wrapper, 'error_message').exists()).toBeFalsy();
	})
	it('should render error message when any error occurred', () => {
		wrapper.find(NullComponent).simulateError(error);
		expect(findByTestAtrr(wrapper, 'error_message').exists()).toBeTruthy();
	})
	it('should render error page when any error occurred and showPage is set to true', () => {
		props.showPage = true;
		mountComponent(props);
		wrapper.find(NullComponent).simulateError(error);
		expect(findByTestAtrr(wrapper, 'error_page').exists()).toBeTruthy();
	})
});
