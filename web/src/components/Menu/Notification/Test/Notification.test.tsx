import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ProjectStatus from '../../../../enums/ProjectStatus';
import Notification from '../../Notification/index'
import { store } from '../../../../store';
import { ActionType } from '../../../../store/Notifications/Types/ActionType';
import notificationReducer, { initialState } from '../../../../store/Notifications/Reducer';

let props: any = {
	notifications: [{
		notificationId: 1,
		projectId: 1,
		senderId: "test@pds.com",
		receiverId: "test@pds1.com",
		notificationType: 1,
		description: 1,
		status: 0,
		createdOn: null,
		modifiedOn: null
	}],
	showNotify: true,
	lookUpData: [{ lookupItem: 'Project_Status', lookupKey: 1 }, { description: "test", lookupItem: 'Notification_Template', lookupKey: 1 }, { lookupItem: 'Engagement_Type', lookupKey: 0 }, { lookupItem: 'Asset_Type', lookupKey: 0 }]
};
describe('Notification Renders', () => {
	const mockStore = configureStore([]);
	let store;
	let wrapper;
	const setUpStore = () => {
		store = mockStore({
		});
	};
	const renderComponent = (store, props) => {
		wrapper = mount(
			<Provider store={store}>
				<IntlProvider locale="en" messages={translations['en'].messages}>
					<BrowserRouter>
						<Notification
							notifications={props.notifications}
							showNotification={props.showNotify}
							lookups={props.lookUpData}
						/>
					</BrowserRouter>
				</IntlProvider>
			</Provider>
		);
	};
	beforeEach(() => {
		setUpStore();
	});
	it('Defines the component', () => {
		renderComponent(store, props);
		expect(wrapper).toBeDefined();
	});
	it('should match the snapshot', () => {
		renderComponent(store, props);
		expect(wrapper).toMatchSnapshot();
	});
	it('should have notify_dropdown', () => {
		renderComponent(store, props);
		expect(wrapper.find('.notify_dropdown')).toHaveLength(1);
	});

	it('should have notifications header', () => {
		renderComponent(store, props);
		expect(wrapper.find('.notify_topbar')).toHaveLength(1);
	});

	it('should render list of notifications', () => {
		renderComponent(store, props);
		expect(wrapper.find('.brief')).toHaveLength(1);
	});

	
	it('should have badge when unread notification', () => {			
		renderComponent(store, props);
		console.log(wrapper.debug());
		expect(wrapper.find('.badge')).toHaveLength(1);
	});
	
	it('should not render list of notifications', () => {	
	props.notifications =	[];	
		renderComponent(store, props);
		expect(wrapper.find('.brief')).toHaveLength(0);
	});

	it('should not have bedge when no unread message', () => {	
		props.notifications = [{
			notificationId: 1,
			projectId: 1,
			senderId: "test@pds.com",
			receiverId: "test@pds1.com",
			notificationType: 1,
			description: 1,
			status: 1,
			createdOn: null,
			modifiedOn: null
		}]	
			renderComponent(store, props);
			expect(wrapper.find('.badge')).toHaveLength(0);
		});

		it('should not have bedge when no message', () => {	
			props.notifications =	[];	
				renderComponent(store, props);
				expect(wrapper.find('.badge')).toHaveLength(0);
			});

});

describe('Notification reducer', () => {
	beforeEach(() => {
	  store.dispatch = jest.fn();
	})
  
	it('should handle get notification success action', () => {
	  const getAllNotifications: any = {
		type: ActionType.GET_ALL_NOTIFICATIONS_SUCCESS,
		payload: [{}],
	  };
	  expect(
		notificationReducer(initialState, getAllNotifications)
	  ).toMatchSnapshot();
	});
  
	it('should handle get notifications failure', () => {
	  const getNotificationFailureAction: any = {
		type: ActionType.GET_ALL_NOTIFICATIONS_ERROR,
		error: true
	  };
	  expect(
		notificationReducer(initialState, getNotificationFailureAction)
	  ).toMatchSnapshot();
	});
  
});
