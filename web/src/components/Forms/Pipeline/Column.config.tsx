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
            attrs: () => ({ 'data-column': formatMessage('MESSAGE_PROJECT_NAME'), 'id': 'pipeline_project_nameID' }),
            headerAttrs: { 'id': 'pipeline_project_nameID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'headOfProject',
            text: formatMessage('LABEL_HEAD_OF_PROJECT'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_HEAD_OF_PROJECT'), 'id': 'pipeline_head_proID' }),
            headerAttrs: { 'id': 'pipeline_head_proID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'contractorId',
            text: formatMessage('LABEL_CLIENT_CUSTOMER'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_CLIENT_CUSTOMER'), 'id': 'pipeline_client_customerID' }),
            headerAttrs: { 'id': 'pipeline_client_customerID' },
            sort: false,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'projectStatusDescription',
            text: formatMessage('LABEL_STATUS'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_STATUS'), 'id': 'pipeline_statusID' }),
            headerAttrs: { 'id': 'pipeline_statusID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter
        },
        {
            dataField: 'commenceDate',
            text: formatMessage('LABEL_EXPECTED_START_DATE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_EXPECTED_START_DATE'), 'id': 'pipeline_start_dateID' }),
            headerAttrs: { 'id': 'pipeline_start_dateID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.date }
        },
        {
            dataField: 'jaValue',
            text: formatMessage('LABEL_JA_VALUE'),
            attrs: () => ({ 'data-column': formatMessage('LABEL_JA_VALUE'), 'id': 'pipeline_ja_valueID' }),
            headerAttrs: { 'id': 'pipeline_ja_valueID' },
            sort: true,
            sortCaret: sortCaret,
            formatter: columnFormatter,
            formatExtraData: { type: ColumnTypeEnum.currency }
        },

    ];
};

export default gridColumns;