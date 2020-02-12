import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import QueryPopup from '../QueryPopup';
import { findByTestAtrr } from '../../../helpers/test-helper';
import translations from '../../../Translations/translation';
import { mount, ShallowWrapper, shallow } from 'enzyme';
import { store } from '../../../store';

describe('Query modal popup testCases', () => {
    const mockStore = configureStore([]);
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
    beforeEach(() => {
        wrapper = shallow(
            <Provider store={store}>
                <IntlProvider locale="en" messages={translations['en'].messages}>
                    <QueryPopup {...props} />
                </IntlProvider>
            </Provider>
        );
    });
    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });
    it('Renders form component', () => {
        console.log(wrapper);
        let form = wrapper.find('QueryPopup').first();
        expect(form).toHaveLength(0);
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render Query modal popup', () => {
        expect(shallow(<QueryPopup {...props} />).find('#exampleModal').length).toEqual(0);
    });
});
