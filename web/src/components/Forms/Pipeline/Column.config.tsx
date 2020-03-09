import ColumnTypeEnum from '../../../enums/ColumnTypeEnum';
import { columnFormatter, sortCaret } from '../../../helpers/table-helper';
import { formatMessage } from '../../../Translations/connectedIntlProvider';

/* istanbul ignore file */
const gridColumns = () => {
    return [
  
        {
            dataField: 'projectRefId',
            text: formatMessage('MESSAGE_PROJECT_ID'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_projectID' }),
            headerAttrs: { 'id': 'pipeline_projectID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'name',
            text: formatMessage('MESSAGE_PROJECT_NAME'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_project_nameID' }),
            headerAttrs: { 'id': 'pipeline_project_nameID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'projectOwner',
            text: formatMessage('LABEL_OWNER'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_ownerID' }),
            headerAttrs: { 'id': 'pipeline_ownerID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'headOfProject',
            text: formatMessage('LABEL_HEAD_OF_PROJECT'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_head_proID' }),
            headerAttrs: { 'id': 'pipeline_head_proID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'lastModified',
            text: formatMessage('LABEL_LAST_UPDATE'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_last_updateID' }),
            headerAttrs: { 'id': 'pipeline_last_updateID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'contractorId',
            text: formatMessage('LABEL_CLIENT_CUSTOMER'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_client_customerID' }),
            headerAttrs: { 'id': 'pipeline_client_customerID' },
            sort: false,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'probabilityOfWinning',
            text: formatMessage('LABEL_PROBABILITY_OF_WINING'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_probability_winingID' }),
            headerAttrs: { 'id': 'pipeline_probability_winingID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.percentage }
        },
        {
            dataField: 'projectStatusDescription',
            text: formatMessage('LABEL_STATUS'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_statusID' }),
            headerAttrs: { 'id': 'pipeline_statusID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'commenceDate',
            text: formatMessage('LABEL_EXPECTED_START_DATE'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_start_dateID' }),
            headerAttrs: { 'id': 'pipeline_start_dateID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.date }
        },
        {
            dataField: 'approxValue',
            text: formatMessage('LABEL_APPROX_VALUE'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_approx_valueID' }),
            headerAttrs: { 'id': 'pipeline_approx_valueID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.currency }
        },

        {
            dataField: 'contractTypeDescription',
            text: formatMessage('LABEL_CONTRACT_TYPE'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_contract_typeID' }),
            headerAttrs: { 'id': 'pipeline_contract_typeID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'cdmNotifiable',
            text: formatMessage('LABEL_CMD_NOTIFIABLE'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_CMD_notifiableID' }),
            headerAttrs: { 'id': 'pipeline_CMD_notifiableID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'soldMargin',
            text: formatMessage('LABEL_SOLD_MARGIN'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_bid_marginID' }),
            headerAttrs: { 'id': 'pipeline_bid_marginID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.percentage }
        },
        {
            dataField: 'weightedTCV',
            text: formatMessage('LABEL_WEIGHTED_TCV'),
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_ID'), 'id': 'pipeline_weighted_tcvID' }),
            headerAttrs: { 'id': 'pipeline_weighted_tcvID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.currency }
        },
    ];
};

export default gridColumns;