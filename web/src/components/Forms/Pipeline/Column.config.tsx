import ColumnTypeEnum from '../../../enums/ColumnTypeEnum';
import { columnFormatter, sortCaret } from '../../../helpers/table-helper';
import { formatMessage } from '../../../Translations/connectedIntlProvider';

/* istanbul ignore file */
const gridColumns = () => {
    return [
        {
            dataField: 'projectRefId',
            text: formatMessage('MESSAGE_PROJECT_ID'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'name',
            text: formatMessage('MESSAGE_PROJECT_NAME'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_NAME') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'projectOwner',
            text: formatMessage('LABEL_OWNER'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_OWNER') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'headOfProject',
            text: formatMessage('LABEL_HEAD_OF_PROJECT'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_HEAD_OF_PROJECT') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'lastModified',
            text: formatMessage('LABEL_LAST_UPDATE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_LAST_UPDATE') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'contractorId',
            text: formatMessage('LABEL_CLIENT_CUSTOMER'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_CLIENT_CUSTOMER') }),
            sort: false,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'probabilityOfWinning',
            text: formatMessage('LABEL_PROBABILITY_OF_WINING'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_PROBABILITY_OF_WINING') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.percentage }
        },
        {
            dataField: 'projectStatusDescription',
            text: formatMessage('LABEL_STATUS'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_STATUS') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'commenceDate',
            text: formatMessage('LABEL_EXPECTED_START_DATE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_EXPECTED_START_DATE') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.date }
        },
        {
            dataField: 'approxValue',
            text: formatMessage('LABEL_APPROX_VALUE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_APPROX_VALUE') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.currency }
        },

        {
            dataField: 'contractTypeDescription',
            text: formatMessage('LABEL_CONTRACT_TYPE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_CONTRACT_TYPE') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'cdmNotifiable',
            text: formatMessage('LABEL_CMD_NOTIFIABLE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_CMD_NOTIFIABLE') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'soldMargin',
            text: formatMessage('LABEL_SOLD_MARGIN'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_SOLD_MARGIN') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.percentage }
        },
        {
            dataField: 'weightedTCV',
            text: formatMessage('LABEL_WEIGHTED_TCV'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_WEIGHTED_TCV') }),
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.currency }
        },
    ];
};

export default gridColumns;