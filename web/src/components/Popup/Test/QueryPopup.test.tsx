import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import QueryPopup from '../QueryPopup';
import { findByTestAtrr } from '../../../helpers/test-helper';
import translations from '../../../Translations/translation';
import { mount, ShallowWrapper } from 'enzyme';
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
        handleConfirm: jest.fn(),
        handleReject: jest.fn(),
    };
    let form: ShallowWrapper;
    beforeEach(() => {
        store = mockStore({});
        wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale="en" messages={translations['en'].messages}>
                    <QueryPopup {...props} />
                </IntlProvider>
            </Provider>
        );
    });
    it('Renders form component', () => {
        console.log('wrapper', wrapper);
        form = wrapper.find('[form="QueryPopup"]').first();
        expect(form).toHaveLength(1);
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    // it('should render Query modal popup', () => {
    //     confirmAlert(props);
    //     let doc: any = (document.getElementById('react-confirm-alert'));
    //     expect(doc.innerHTML).not.toBeNull();
    //     expect(doc.childElementCount).toBe(1);
    // });
    // it('should remove query modal popup on click of cancel button', () => {
    //     let container = findByTestAtrr(wrapper, "button_reject").first();
    //     container.simulate('click');
    //     expect(props.handleReject.mock.calls.length).toEqual(1);
    // });
    // it('should remove query modal popup on click of confirm button', () => {
    //     let container = findByTestAtrr(wrapper, "button_confirm").first();
    //     container.simulate('click');
    //     expect(props.handleConfirm.mock.calls.length).toEqual(1);
    // });
});
