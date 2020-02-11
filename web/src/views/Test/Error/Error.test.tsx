import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Error from '../../Error/Error';
import ErrorType from '../../../enums/ErrorType';
import { findByTestAtrr } from '../../../helpers/test-helper';


const mockStore = configureStore([]);
let store;
let wrapper;

const setUpStore = () => {
    store = mockStore({});
    store.dispatch = jest.fn();
};
const mountComponent = (Props) => {
    wrapper = mount(
        <Provider store={store}>
            <IntlProvider locale="en" messages={translations['en'].messages}>
                <Router>
                    <Error {...Props} />
                </Router>
            </IntlProvider>
        </Provider>
    );
};
describe('Error component test cases', () => {
    const getProps: any = (errorType: ErrorType) => {
        let props = {
            history: { push: jest.fn() },
            location: {
                state: {
                    type: errorType
                }
            }
        }
        return props;
    };
    const setupComponent = (errorType: ErrorType) => {
        setUpStore();
        mountComponent(getProps(errorType));
    };

    it('defines the component', () => {
        setupComponent(ErrorType.unauthorised);
        expect(wrapper).toBeDefined();
    });
    it('should render unauthorize section', () => {
        setupComponent(ErrorType.unauthorised);
        expect(findByTestAtrr(wrapper, 'unauthorisedHeader')).toHaveLength(1);
        expect(findByTestAtrr(wrapper, 'unauthorisedText')).toHaveLength(1);
        expect(findByTestAtrr(wrapper, 'pagenotFoundHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pagenotFoundText')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pageWarningHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pageWarningText')).toHaveLength(0);
    });

    it('should render page not found section', () => {
        setupComponent(ErrorType.pageNotFound);
        expect(findByTestAtrr(wrapper, 'unauthorisedHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'unauthorisedText')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pagenotFoundHeader')).toHaveLength(1);
        expect(findByTestAtrr(wrapper, 'pagenotFoundText')).toHaveLength(1);
        expect(findByTestAtrr(wrapper, 'pageWarningHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pageWarningText')).toHaveLength(0);
    });
    it('should render warning section ', () => {
        setupComponent(ErrorType.warning);
        expect(findByTestAtrr(wrapper, 'unauthorisedHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'unauthorisedText')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pagenotFoundHeader')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pagenotFoundText')).toHaveLength(0);
        expect(findByTestAtrr(wrapper, 'pageWarningHeader')).toHaveLength(1);
        expect(findByTestAtrr(wrapper, 'pageWarningText')).toHaveLength(1);
    });
    it('should render Back to Dashboard button ', () => {
        setupComponent(ErrorType.unauthorised);
        expect(findByTestAtrr(wrapper, 'btnDashboard')).toHaveLength(1);
    });

    it('should add blank to history onClick of Back to Dashboard button ', () => {
        const props = getProps(ErrorType.unauthorised);
        mountComponent(props);
        const btnDashboard = findByTestAtrr(wrapper, 'btnDashboard').first();
        btnDashboard.simulate('click');
        wrapper.update();
        expect(props.history.push).toHaveBeenCalledWith('');
    });
});