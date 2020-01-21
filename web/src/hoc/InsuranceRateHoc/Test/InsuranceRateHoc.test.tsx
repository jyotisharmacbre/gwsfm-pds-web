import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { insuranceRateHoc } from '../index';

let wrapper;

const mountComponent = (Props) => {
	const Component = (props) => <h1 data-test="insurance-rate">{props.insuranceRate}</h1>;
	const hoc = () => insuranceRateHoc(Component);
	const ComponentWithHOC = hoc();
	wrapper = mount(<ComponentWithHOC {...Props} />);
};
describe('Insurance rate HOC test cases', () => {
	const Props = {
		adminDefaultValues: [ { projectParameterId: 428, countryId: 143, name: 'Insurance_Rate_Perc', value: '2.6' } ]
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
	it('should return the value 2.6 in insurance rate', () => {
		expect(findByTestAtrr(wrapper, 'insurance-rate').text()).toEqual('2.6');
	});
	it('should return the value 1.6 in insurance rate', () => {
		Props.adminDefaultValues[0].value = 1.6;
		mountComponent(Props);
		expect(findByTestAtrr(wrapper, 'insurance-rate').text()).toEqual('1.6');
	});
});
