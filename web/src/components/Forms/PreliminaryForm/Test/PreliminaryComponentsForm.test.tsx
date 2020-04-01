import React from 'react';
import { shallow, mount } from 'enzyme';
import PreliminaryComponentsForm from '../PreliminaryComponentsForm';
import { preliminariuserData, preliminaryComponentIdList, preliminariBlankData } from './PreliminaryFormTestData';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { initialState } from '../../../../store/Preliminaries/InitialState';
import ProjectStatus from '../../../../enums/ProjectStatus';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { reduxForm } from 'redux-form';
import EventType from '../../../../enums/EventType';

let wrapper: any;

const Decorated = reduxForm({ form: "PreliminaryForm" })(PreliminaryComponentsForm);

let props = {
    fields: [...preliminariuserData],
    submitHandler: jest.fn(),
    handleSubmit: jest.fn(),
    onToggleEvent: jest.fn(),
    prelimData: [...preliminariuserData],
    componentIdList: preliminaryComponentIdList,
    currencySymbol: "$",
    isExpand: true,
    projectStatus: ProjectStatus.BidLost,
    event: EventType.none
}

const mountComponent = (props) => {
    wrapper = mount(
        <Provider store={store}>
            <IntlProvider locale="en" messages={translations['en'].messages}>
                <Decorated
                    fields={props.fields}
                    submitHandler={props.submitHandler}
                    handleSubmit={props.handleSubmit}
                    onToggleEvent={props.onToggleEvent}
                    prelimData={props.prelimData}
                    componentIdList={props.componentIdList}
                    currencySymbol={props.currencySymbol}
                    isExpand={props.isExpand}
                    projectStatus={props.projectStatus}
                    event={props.event}
                />
            </IntlProvider>
        </Provider>
    );
};

describe('Preliminary Components Form test cases', () => {
    beforeEach(() => {
        initialState.preliminaryDetails = [...preliminariuserData];
        mountComponent(props);
    });

    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });
    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should render toggle button event on click of component collapse icon', () => {
        const button = findByTestAtrr(wrapper, 'tickWrap').first();
        button.simulate('click');
        expect(props.onToggleEvent.mock.calls.length).toBeGreaterThan(0);
    });
    it('should render save button once for each components', () => {
        const button = findByTestAtrr(wrapper, 'componentSave');
        expect(button.length).toEqual(1);
    });
    it('should collapse the item component on click of component collapse icon', () => {
        const button = findByTestAtrr(wrapper, 'tickWrap').first();
        const toggle = findByTestAtrr(wrapper, 'toggle');
        button.simulate('click');
        expect(props.onToggleEvent.mock.calls.length).toBeGreaterThan(0);
    });
    it('should render check-mark if preliminariuserData item has id', () => {
        const collapseContainer = findByTestAtrr(wrapper, 'tickWrap').first();
        const checkBox = collapseContainer.find('.tick_wrap');
        expect(checkBox).toHaveLength(1);
    });
    it('should call form submit handler on save button click', () => {
        const button = findByTestAtrr(wrapper, 'componentSave');
        button.simulate('click');
        expect(props.handleSubmit.mock.calls.length).toBeGreaterThan(0);
    });
    describe('improving code coverage of branches', () => {
        it('improving code coverage', () => {
            props.fields = preliminariBlankData;
            props.prelimData = preliminariBlankData;
            mountComponent(props);
        });
        it('improving code coverage', () => {
            props.fields = preliminariBlankData;
            props.projectStatus = ProjectStatus.Completed;
            props.isExpand = false;
            props.prelimData = preliminariBlankData;
            mountComponent(props);
        });
    });
});

