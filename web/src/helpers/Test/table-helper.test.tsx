import {
    columnFormatter, extractQueryParams, sortCaret,
    setTableQueryParams, setURLParammsForGridTable
} from '../table-helper'
import ColumnTypeEnum from '../../enums/ColumnTypeEnum';

describe('table-helper functions run without error', () => {

    it('should return formatted column discount based on discount type percent and discount value', () => {
        let result = columnFormatter(100, null, 1, { type: ColumnTypeEnum.numeric });
        expect(result.type).toEqual('div');
        expect(result.props.children[0].type).toEqual('span');
        expect(result.props.children[0].props.children).toEqual(100);
    });

    it('should return up sortIcon for toggling from desc order', () => {
        let result = sortCaret('desc', null);
        expect(result.type.name).toEqual('FontAwesomeIcon');
        expect(result.props.icon.iconName).toEqual('arrow-up');
    });

    it('should return undefined for no order', () => {
        let result = sortCaret(null, null);
        expect(result).toEqual(undefined);
    });
});
``