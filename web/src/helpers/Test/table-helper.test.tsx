import {
    columnFormatter, extractQueryParams, sortCaret,
    setTableQueryParams, setURLParammsForGridTable
} from '../table-helper';

import ColumnTypeEnum from '../../enums/ColumnTypeEnum';
import { queryParamsData } from './table-helper-test-data';
describe('table-helper functions run without error', () => {

    it('should return formatted column for numeric type value', () => {
        let result = columnFormatter(100, null, 1, { type: ColumnTypeEnum.numeric });
        expect(result.type).toEqual('div');
        expect(result.props.children[0].type).toEqual('span');
        expect(result.props.children[0].props.children).toEqual(100);
        expect(result.props.children[0].props.className).toEqual('float-right');

    });

    it('should return formatted column for currency type value', () => {
        let result = columnFormatter(100, null, 1, { type: ColumnTypeEnum.currency });
        expect(result.type).toEqual('div');
        expect(result.props.children[0].type).toEqual('span');
        expect(result.props.children[0].props.children).toEqual(100);
    });
    it('should return formatted column for date type value', () => {
        let result = columnFormatter('03-02-2020', null, 1, { type: ColumnTypeEnum.date });
        expect(result).toEqual('2-Mar-2020');
    });

    it('should return formatted column for percentage type value', () => {
        let result = columnFormatter(100, null, 1, { type: ColumnTypeEnum.percentage });
        expect(result.type).toEqual('div');
        expect(result.props.children[0].type).toEqual('span');
        expect(result.props.children[0].props.children).toEqual('100 %');
        expect(result.props.children[0].props.className).toEqual('float-right');
    });

    it(' should return up sortIcon for toggling from desc order', () => {
        let result = sortCaret('desc', null);
        expect(result?.props.children.type.name).toEqual('FontAwesomeIcon');
        expect(result?.props.children.props.icon.iconName).toEqual('arrow-up');
    });

    it('should return up sortIcon for toggling from asc order', () => {
        let result = sortCaret('asc', null);
        expect(result?.props.children.type.name).toEqual('FontAwesomeIcon');
        expect(result?.props.children.props.icon.iconName).toEqual('arrow-down');
    });

    it('should return undefined for no order', () => {
        let result = sortCaret(null, null);
        expect(result).toEqual(undefined);
    });


    it('should return tableQueryParams based on the input params', () => {
        let result = setTableQueryParams({
            page: 1,
            sizePerPage: 1,
            sortField: 'test',
            sortOrder: 'asc'
        });
        expect(result.pagingParams.pageIndex).toEqual(1);
        expect(result.pagingParams.pageSize).toEqual(1);
        expect(result.sortingParams.sortColumnName).toEqual('test');
        expect(result.sortingParams.sortOrder).toEqual('asc');

    });
    it('should return URLParammsForGridTable when both pagination and sorting enabled', () => {
        let result = setURLParammsForGridTable([], '/test', queryParamsData);
        expect(result[0].pathname).toEqual('/test');
        expect(result[0].search).toEqual('?pageIndex=1&pageSize=1&sortField=test&sortOrder=asc');
    });

    it('should return URLParammsForGridTable when only pagination enabled', () => {
        let result = setURLParammsForGridTable([], '/test', queryParamsData, false);
        expect(result[0].pathname).toEqual('/test');
        expect(result[0].search).toEqual('?pageIndex=1&pageSize=1');
    });
    it('should return URLParammsForGridTable when only sorting enabled', () => {
        let result = setURLParammsForGridTable([], '/test', queryParamsData, true, false);
        expect(result[0].pathname).toEqual('/test');
        expect(result[0].search).toEqual('?sortField=test&sortOrder=asc');
    });

    it('should return queryParams when url string is having params', () => {
        let result = extractQueryParams("?pageIndex=1&pageSize=1&sortField=test&sortOrder=asc", 'test', 1, 2);
        expect(result.pagingParams.pageIndex).toEqual(1);
        expect(result.pagingParams.pageSize).toEqual(1);
        expect(result.sortingParams.sortColumnName).toEqual('test');
        expect(result.sortingParams.sortOrder).toEqual('asc');
    });
});
``