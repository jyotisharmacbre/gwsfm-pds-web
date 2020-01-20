import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr } from '../../../helpers/test-helper';
import { currencyHoc } from '../index';

let wrapper;

const mountComponent = (Props) => {
	const Component = (props) => <h1 data-test="currency-symbol">{props.currencySymbol}</h1>;
	const hoc = () => currencyHoc(Component);
	const ComponentWithHOC = hoc();
	wrapper = mount(<ComponentWithHOC {...Props} />);
};
describe('ActivityFeed list test cases', () => {
	const Props = {
		project: { currencyId: 1 },
		currencies: [ { currencyId: 1, currencySymbol: '$' }, { currencyId: 2, currencySymbol: '€' } ]
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
	it('should return the $ in the currency symbol', () => {
		expect(findByTestAtrr(wrapper, 'currency-symbol').text()).toEqual('$');
	});
	it('should return the € in the currency symbol', () => {
		Props.project.currencyId = 2;
		mountComponent(Props);
		expect(findByTestAtrr(wrapper, 'currency-symbol').text()).toEqual('€');
	});
});
