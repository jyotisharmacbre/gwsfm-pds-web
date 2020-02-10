import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { countryHoc } from '../index';

let wrapper;

const mountComponent = (Props) => {
	const Component = (props) => <h1 data-test="country-code">{props.countryCode}</h1>;
	const hoc = () => countryHoc(Component);
	const ComponentWithHOC = hoc();
	wrapper = mount(<ComponentWithHOC {...Props} />);
};
describe('Country HOC test cases', () => {
	const Props = {
		project: { countryId: 1 },
		countries: [
			{ countryId: 1, name: 'United Kingdom', code: 'GBP' },
			{ countryId: 2, name: 'India', code: 'INR' }
		]
	};
	beforeEach(() => {
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should return the GBP in the country code', () => {
		expect(findByTestAtrr(wrapper, 'country-code').text()).toEqual('GBP');
	});
	it('should return the INR in the country code', () => {
		Props.project.countryId = 2;
		mountComponent(Props);
		expect(findByTestAtrr(wrapper, 'country-code').text()).toEqual('INR');
	});
});
