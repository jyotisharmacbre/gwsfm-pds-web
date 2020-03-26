import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import QueryPopup from '../QueryPopup';
import translations from '../../../Translations/translation';
import { mount } from 'enzyme';
import { store } from '../../../store';
import { findByTestAtrr } from '../../../helpers/test-helper';


describe('Query modal popup testCases', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;
    const props: any = {
        intl: {
            formatMessage: ({ defaultMessage }) => defaultMessage
        },
        titleKey: "test",
        contentKey: "test",
        handleCancel: jest.fn(),
        handleConfirm: jest.fn(),
    };
    store = mockStore({});
    let mountComponent = props => {
                wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale="en" messages={translations['en'].messages}>
                    <QueryPopup {...props} />
                </IntlProvider>
            </Provider>
        );
    };
    it('Defines the component', () => {
        mountComponent(props);
        expect(wrapper).toBeDefined();
    });
    it('Renders form component', () => {
        console.log(wrapper);
        mountComponent(props);
        let form = wrapper.find('QueryPopup').first();
        expect(form).toHaveLength(1);
    });
    it('should match the snapshot', () => {
        mountComponent(props);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render Query modal popup', () => {
        mountComponent(props);
        expect(wrapper.find('#exampleModal').length).toEqual(1);
    });
    it('should remove query modal popup on click of cancel button', () => {
        mountComponent(props);
        let container = findByTestAtrr(wrapper, 'button_reject').first();
        container.simulate('click');
        let doc: any = document.getElementById('exampleModal');
        expect(props.handleCancel.mock.calls.length).toEqual(1);
        expect(doc).toBeNull();
      });
    it('should define confirm button', () => {
        mountComponent(props);
        let confirmButton = findByTestAtrr(wrapper, 'button_confirm').first();
        let closeButton = findByTestAtrr(wrapper, 'close_icon').first();
        confirmButton.simulate('click');
        closeButton.simulate('click');
        expect(confirmButton).toBeDefined();
        expect(closeButton).toBeDefined();
    
      });
    
});
