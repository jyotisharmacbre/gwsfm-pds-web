
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../Translations/translation';
import TypeAhead from '../TypeAhead';
import { getTypeAheadDropdown } from './TypeAheadTestData';

export function getMenuItems(wrapper) {
    return wrapper.find('a.dropdown-item');
}


describe('TypeAhead Field', () => {
    let wrapper: any;

    beforeEach(() => {

        wrapper = shallow(
            <Provider store={store}>
                <IntlProvider locale="en" messages={translations['en'].messages}>
                    <TypeAhead name="typeAheadName"
                        options={getTypeAheadDropdown}
                        DynamicsType="typeAheadName"
                        placeholderKey="PLACEHOLDER"
                        className="required"
                        labelName="LABEL"
                        validationKey="LABEL"
                        submitParam="paramToSend" />
                </IntlProvider>
            </Provider>
        );
    });

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });
    it('Should render a autocomplete field', () => {
        let isAutocomplete = wrapper.find('aria-autocomplete');
        expect(isAutocomplete).toBeTruthy;
    });
    it('Should render menu items', () => {
        wrapper.simulate('focus');
        let menuItems = getMenuItems(wrapper);
        expect(menuItems).toHaveLength;
        expect(getTypeAheadDropdown[0].Name).toEqual('Other');
    });

});



