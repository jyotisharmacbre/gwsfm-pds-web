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


describe('Project PipelineFilters Form', () => {
    let wrapper: any;
    const props: any = {
        // fields: []
        name: 'TestAmit',
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

    it('Should renders applyFilter button', () => {
        expect(findByTestAtrr(wrapper, 'apply')).toBeDefined();
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
        let field;
        beforeEach(() => {
            field = findByTestAtrr(wrapper, 'clear');
        });
        it('Should renders Pipeline filter button', () => {
            expect(field.prop('type')).toBe('button');
        });
        it('Should renders clearAll button', () => {
            expect(field).toBeDefined();
        })

        it('Should clear all', () => {
            const projectNameField = findByTestAtrr(wrapper, 'projectName');
            const event = { target: { value: "Test" } };
            projectNameField[0].simulate("change", event)

            field.simulate('click');
            // const pipelineFiltersContainer = findByTestAtrr(wrapper, 'pipelineFiltersContainer');
            expect(projectNameField.hasClass('active')).toEqual(true);
        });

        // it('Should apply hide class on pipelineFiltersContainer div on click of Pipeline filter button', () => {
        //     field.simulate('click'); 
        //     field.simulate('click');
        //     const pipelineFiltersContainer = findByTestAtrr(wrapper, 'pipelineFiltersContainer');
        //     expect(pipelineFiltersContainer.hasClass('hide')).toEqual(true);
        // });
    });
});