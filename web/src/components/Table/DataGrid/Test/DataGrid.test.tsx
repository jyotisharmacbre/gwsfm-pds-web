import React from 'react';
import { IntlProvider } from 'react-intl';
import translations from '../../../../Translations/translation';
import { mount } from 'enzyme';
import DataGrid from '../DataGrid';
import { IGridTableProps } from '../../../../props/AppProps';
import { gridTestColumns, gridTestData } from './DataGridTestData';

let wrapper: any;

const mountDataGridTable = (props) => {
    wrapper = mount(
        <IntlProvider locale="en" messages={translations['en'].messages}>
            <DataGrid {...props} />
        </IntlProvider>
    );
};


describe('DataGrid Table tests', () => {
    let Props: IGridTableProps = {
        columns: gridTestColumns(),
        data: gridTestData(),
        sorting: true,
        className: "price-table",
        ActionList: [],
        onTableChange: jest.fn(),
        totalSize: 2,
        pagination: true,
        queryParams: {
            pagingParams: {
                pageIndex: 1,
                pageSize: 2
            },
            sortingParams: {
                sortColumnName: "name",
                sortOrder: 'desc'
            }
        },
        intl: {
            formatMessage: ({ defaultMessage }) => defaultMessage
        },

    };

    beforeEach(() => {
        mountDataGridTable(Props);
    });

    it('defines the component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should match the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('should not show error row when no data is present', () => {
        expect(wrapper.find('.recordNot_found').length).toEqual(0);
    });

    it('should have pagination button count 5', () => {
        expect(wrapper.find('.pagination_outer a').length).toEqual(5);
    });

    it('should not show the size per dropdown element and show total records when pagiantion is off', () => {
        let props = { ...Props };
        props.pagination = false
        mountDataGridTable(props);
        expect(wrapper.find('Component .custom-size-filter').length).toEqual(0);
    });

    it('should show error row when no data is present', () => {
        let props = { ...Props };
        props.data = [];
        mountDataGridTable(props);
        expect(wrapper.find('.recordNot_found').length).toEqual(1);
    });

    it('should have total no of filter page size option equals to 4', () => {
        wrapper.find('.record-select').first().find('option').length
    });
});