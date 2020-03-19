import React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import * as connectedIntlProvider from './../../../../Translations/connectedIntlProvider';
import ProjectPipelineFilters from '../ProjectPipelineFilters';
import { findByTestAtrr } from '../../../../helpers/test-helper';
import { ILookup } from '../../../../store/Lookups/Types/ILookup';
import PipelineFilterType from '../../../../enums/PipelineFilterType';


describe('Project PipelineFilters Form', () => {
    let wrapper: any;
    const props: any = {
        onApplyFilter: jest.fn(),
        lookupValues: [{
            lookupId: 1,
            lookupItem: 'Project_Status',
            lookupKey: 1,
            description: 'Initial Customer Inquiry'
        },
        {
            lookupId: 2,
            lookupItem: 'Project_Status',
            lookupKey: 2,
            description: 'J&A'
        }],
        applyFilterLoader: false
    };
    beforeEach(() => {
        const formatMessage = jest.mock('./../../../../Translations/connectedIntlProvider');
        jest.spyOn(connectedIntlProvider, 'formatMessage').mockImplementationOnce(() => {
            return 'intlmessage';
        });

        wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale="en" messages={translations['en'].messages}>
                    <ProjectPipelineFilters {...props} />
                </IntlProvider>
            </Provider>
        );
    });
    it('Defines the component', () => {
        expect(wrapper).toBeDefined();
    });

    it('Should renders lastModified form field', () => {
        expect(findByTestAtrr(wrapper, 'lastModified')).toBeDefined();
    });

    it('Should renders projectStartDate form field', () => {
        expect(findByTestAtrr(wrapper, 'projectStartDate')).toBeDefined();
    });

    it('Should renders projectEndDate form field', () => {
        expect(findByTestAtrr(wrapper, 'projectEndDate')).toBeDefined();
    });
    it('Should renders status form field', () => {
        expect(findByTestAtrr(wrapper, 'projectStatus')).toBeDefined();
    })
    it('Should renders projectRefId form field', () => {
        expect(findByTestAtrr(wrapper, 'projectRefId')).toBeDefined();
    })
    it('Should renders Project name form field', () => {
        expect(findByTestAtrr(wrapper, 'projectName')).toBeDefined();
    })

    describe('Pipeline Filter button', () => {
        let field;
        beforeEach(() => {
            field = wrapper.find('button[name="showFilter"]').first();
        });
        it('Should renders Pipeline filter button', () => {
            expect(field.prop('type')).toBe('button');
        });

        it('Should apply show class on pipelineFiltersContainer div on click of Pipeline filter button', () => {
            field.simulate('click');
            const pipelineFiltersContainer = findByTestAtrr(wrapper, 'pipelineFiltersContainer');
            expect(pipelineFiltersContainer.hasClass('active')).toEqual(true);
        });

        it('Should apply hide class on pipelineFiltersContainer div on click of Pipeline filter button', () => {
            field.simulate('click');
            field.simulate('click');
            const pipelineFiltersContainer = findByTestAtrr(wrapper, 'pipelineFiltersContainer');
            expect(pipelineFiltersContainer.hasClass('deactive')).toEqual(true);
        });
    });

    describe('Pipeline clear all button', () => {
        let clearButton;
        beforeEach(() => {
            clearButton = findByTestAtrr(wrapper, 'clear');
        });
        it('Should be of button type', () => {
            expect(clearButton.prop('type')).toBe('button');
        });
        it('Should renders clearAll button', () => {
            expect(clearButton).toBeDefined();
        })

        for (var type in PipelineFilterType) {
            if (typeof PipelineFilterType[type] === 'number') {
                it(`Should clear ${type} field`, () => {
                    let field = wrapper.find(`input[name="${type}"]`);
                    const event = { target: { value: "TestProject" } };
                    if (field.length > 0) {
                        field.simulate("change", event);
                        expect(wrapper.find(`input[name="${type}"]`).prop('value')).toEqual('TestProject');
                        clearButton.simulate('click');
                        expect(wrapper.find(`input[name="${type}"]`).prop('value')).toEqual('');
                    }
                });
            }
        }

        it('Should call the onApplyFilter method on click of clear all button', () => {
            clearButton.simulate('click');
            expect(props.onApplyFilter).toHaveBeenCalledWith([]);
        });

    });
    describe('Pipeline applyFilter button', () => {
        let applyFilterButton;
        beforeEach(() => {
            applyFilterButton = findByTestAtrr(wrapper, 'apply');
        });

        it('Should renders applyFilter button', () => {
            expect(applyFilterButton).toBeDefined();
        });

        it('Should be of button type', () => {
            expect(applyFilterButton.prop('type')).toBe('button');
        });

        it('Should call the onApplyFilter method', () => {
            applyFilterButton.simulate('click');
            expect(props.onApplyFilter).toHaveBeenCalled();
        });

        it('Should call the onApplyFilter method with params', () => {
            for (var type in PipelineFilterType) {
                if (typeof PipelineFilterType[type] === 'number') {
                    let field = wrapper.find(`input[name="${type}"]`);
                    if (field.length > 0) {
                        const event = { target: { value: "TestProject" } };
                        field.simulate("change", event);
                    }
                    let fieldStartDate = wrapper.find(`input[name="projectStartDate"]`);
                    const eventStartDate = { target: { value: "03/16/2020" } };
                    fieldStartDate.simulate("change", eventStartDate);

                    let fieldEndDate = wrapper.find(`input[name="projectEndDate"]`);
                    const eventEndDate = { target: { value: "02/16/2020" } };
                    fieldEndDate.simulate("change", eventEndDate);

                    let lastModified = wrapper.find(`input[name="lastModified"]`);
                    const eventLastModified = { target: { value: "01/16/2020" } };
                    lastModified.simulate("change", eventLastModified);
                }
            }
            applyFilterButton.simulate('click');
            expect(props.onApplyFilter).toHaveBeenCalledWith(
                [
                    { "filterName": "lastModified", "filterValue": "2020-01-16" },
                    { "filterName": "projectStartDate", "filterValue": "2020-03-16" },
                    { "filterName": "projectEndDate", "filterValue": "2020-02-16" },
                    { "filterName": "projectRefId", "filterValue": "TestProject" },
                    { "filterName": "projectName", "filterValue": "TestProject" },
                ]);
        });
    });

});