import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { reduxForm } from 'redux-form';
import { preliminariuserData, currencies } from './PreliminaryFormTestData';
import PreliminaryItemsForm from '../PreliminaryItemsForm';
import { IPreliminaryForm } from '../../../../store/Preliminaries/Types/IPreliminaryState';
import { Props } from '../PreliminaryFormProps';
import { lookUpInitialState } from '../../ProjectOverviewForm/Test/ActivityFeedListTestData';
import { preliminariesData } from '../../../../views/Test/Preliminaries/PreliminariesTestData';
import PreliminaryInsurranceForm from '../PreliminaryInsurranceForm';

let wrapper;
const mockStore = configureStore([]);
let store;
const Decorated = reduxForm<IPreliminaryForm, Props>({ form: "PreliminaryForm" })(PreliminaryInsurranceForm);
const mockDBStore = () => {
	store = mockStore({
		form: {
			PreliminaryForm: {
				values: {
					preliminaryDetails: preliminariuserData
				}
			}
		},
		preliminary: preliminariuserData,
		
	});
};

const mountComponent = (fields, itemDetail, currencies, currencyId, currencySymbol, componentIndex, preliminaryData) => {
	wrapper = mount(
		<Provider store={store}>
			<IntlProvider locale="en" messages={translations['en'].messages}>
				<Decorated
					itemDetail={itemDetail}
					currencies={currencies}
					currencyId={currencyId}
					currencySymbol={currencySymbol}
					componentIndex={componentIndex}
					fields={[...fields]}
				/>
			</IntlProvider>
		</Provider>
	);
};

describe('Preliminary Items Form Form testCases', () => {
	beforeEach(() => {
		mockDBStore();
		let first = JSON.parse(JSON.stringify(preliminariuserData));
		let second = JSON.parse(JSON.stringify(preliminariuserData));
		mountComponent(first[0].items, second[0], currencies, 1, '$', 0, preliminariuserData);
	});

	it('Defines the component', () => {
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
