import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Notifications from '../../Notifications';

const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = () => {
	store = mockStore({      
	});
	store.dispatch = jest.fn();
};
const mountComponent = (Props) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
            <Router>
				<Notifications {...Props} />
            </Router>
			</IntlProvider>
		</Provider>
	);
};
describe('Pipeline component test cases', () => {
	const Props: any = {	
		
	};
	beforeEach(() => {
		setUpStore();
		mountComponent(Props);
	});

	it('defines the component', () => {
		expect(wrapper).toBeDefined();
	});
});