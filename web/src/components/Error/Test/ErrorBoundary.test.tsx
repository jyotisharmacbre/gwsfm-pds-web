import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let wrapper;
const error = new Error('test');
const NullComponent = () => null;
const mountComponent = () => {
	wrapper = mount(<ErrorBoundary><NullComponent /></ErrorBoundary>);
};
describe('Error boundary test cases', () => {
	beforeEach(() => {
		mountComponent();
	});
	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should set hasError state to false if no error encounted', () => {
		const expected = { hasError: false }
		expect(wrapper.state()).toMatchObject(expected)
	})
	it('should change hasError state to true if any error encounted', () => {
		const expected = { hasError: true }
		wrapper.find(NullComponent).simulateError(error);
		expect(wrapper.state()).toMatchObject(expected)
	})
});
