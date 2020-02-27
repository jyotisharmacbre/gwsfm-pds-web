import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import { getLookupDescription, getPropertyName, getFilterElementFromArray, displayUserName } from '../../../helpers/utility-helper';
import { LookupItems } from '../../../helpers/constants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GridTable from '../../Table/GridTable';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import { injectIntl } from 'react-intl';
import IReactIntl from '../../../Translations/IReactIntl';
import Translate from '../../../Translations/translate';
import ColumnTypeEnum from '../../../enums/ColumnTypeEnum';
import Currency from '../../../store/Lookups/InitialState/Currency';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { IProjectPipelineGrid } from '../../../store/pipeline/Types/IProjectPipelineGrid';
import { IDynamicContractCustomerData } from '../../../store/DynamicsData/Types/IDynamicData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GridTableNew from '../../Table/GridTableNew';
import { columnFormatter, sortCaret } from '../../Table/TableHelper';
import { IProjectPipelineGridState } from '../../../store/pipeline/Types/IProjectPipelineGridState';
interface Props {
  pipelineValues: IProjectPipelineGridState;
  lookupValues: any;
  currencies: Array<ICurrency> | null;
  userNamesForEmailsValues: Array<IUserServiceData>;
  contractCustomerList: Array<IDynamicContractCustomerData>;
  handleTableChange: (type, params) => void;
}
const ProjectPipelineForm: React.FC<Props & IReactIntl> = (props: any) => {
  const CurrencyObj = new Currency();
  const [gridData, setGridData] = useState<Array<IProjectPipelineGrid>>([]);
  useEffect(
    () => {
      if (
        props.pipelineValues?.totalNumberOfRecord > 0 && props.pipelineValues.data[0].projectId !== '' &&
        props.currencies?.length > 0 &&
        props.lookupValues?.length > 0 &&
        props.contractCustomerList?.length > 0 &&
        props.userNamesForEmailsValues && props.userNamesForEmailsValues.length > 0
      ) {
        setGridData(
          getPipelineValues(
            props.pipelineValues.data,
            props.lookupValues,
            props.currencies,
            props.userNamesForEmailsValues,
            props.contractCustomerList
          )
        );
      }
    },
    [props.pipelineValues, props.lookupValues, props.currencies, props.userNamesForEmailsValues, props.contractCustomerList]
  );
  const getPipelineValues = (pipelineData, allLookups, currencies, namesAndEmails, contractCustomerList) => {
    let data = pipelineData.map(function (rowProject) {
      var mailObj = namesAndEmails && rowProject.projectOwner && namesAndEmails.find(
        lk => lk.email && rowProject.projectOwner && lk.email.toUpperCase() === rowProject.projectOwner.toUpperCase()
      );
      rowProject.projectOwner = mailObj && mailObj
        ? `${displayUserName(mailObj)}`
        : rowProject.projectOwner;
      var statusID = rowProject.status;
      if (!isNaN(statusID) && allLookups.length > 0)
        rowProject.status = getLookupDescription(
          allLookups,
          rowProject.status,
          LookupItems.Project_Status
        );
      var customerObj = contractCustomerList && rowProject.contractorId && contractCustomerList.find(
        lk => lk.contractId && rowProject.contractorId && lk.contractId.toUpperCase() === rowProject.contractorId.toUpperCase()
      );
      rowProject.contractorId = customerObj ? customerObj.customerName : rowProject.contractorId;
      const currencySymbol = getFilterElementFromArray(
        currencies,
        getPropertyName(CurrencyObj, (prop) => prop.currencyId),
        rowProject.currencyId,
        getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
      );
      rowProject.approxValue = rowProject.approxValue.toString().indexOf(currencySymbol) > -1 ? rowProject.approxValue : `${currencySymbol}${rowProject.approxValue}`;
      var contractID = rowProject.contractTypeId;
      if (contractID > 0 && allLookups.length > 0)
        rowProject.contractTypeId = getLookupDescription(
          allLookups,
          rowProject.contractTypeId,
          LookupItems.ContractType
        );
      rowProject.lastModified = moment(rowProject.lastModified).format(
        'MM/DD/YYYY'
      );
      rowProject.cdmNotifiable = rowProject.cdmNotifiable ? formatMessage('LABEL_YES') : formatMessage('LABEL_NO');
      rowProject.soldmargin = rowProject.soldmargin ? rowProject.soldmargin : 0;
      rowProject.weightedTCV = rowProject.weightedTCV.toString().indexOf(currencySymbol) > -1 ? rowProject.weightedTCV : `${currencySymbol}${rowProject.weightedTCV ? rowProject.weightedTCV : 0}`;
      rowProject.name = (
        <Link
          to={{
            pathname: `/projectoverview/${rowProject.projectId}`,
            state: { fromPipeline: true }
          }}
        >
          {rowProject.name}
        </Link>
      );
      return rowProject;
    });
    return data;
  };

  const getTableColumns = () => {
    return [
      {
        dataField: 'name',
        text: formatMessage('MESSAGE_PROJECT_NAME'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'projectOwner',
        text: formatMessage('LABEL_OWNER'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'lastModified',
        text: formatMessage('LABEL_LAST_UPDATE'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'contractorId',
        text: formatMessage('LABEL_CLIENT_CUSTOMER'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'probabilityOfWinning',
        text: formatMessage('LABEL_PROBABILITY_OF_WINING'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
        formatExtraData: { type: ColumnTypeEnum.percentage },
      },
      {
        dataField: 'status',
        text: formatMessage('LABEL_STATUS'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'commenceDate',
        text: formatMessage('LABEL_EXPECTED_START_DATE'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
        formatExtraData: { type: ColumnTypeEnum.date }
      },
      {
        dataField: 'approxValue',
        text: formatMessage('LABEL_APPROX_VALUE'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
        formatExtraData: { type: ColumnTypeEnum.currency }
      },

      {
        dataField: 'contractTypeId',
        text: formatMessage('LABEL_CONTRACT_TYPE'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter
      },
      {
        dataField: 'cdmNotifiable',
        text: formatMessage('LABEL_CMD_NOTIFIABLE'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
      },
      {
        dataField: 'soldMargin',
        text: formatMessage('LABEL_SOLD_MARGIN'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
        formatExtraData: { type: ColumnTypeEnum.percentage }
      },
      {
        dataField: 'weightedTCV',
        text: formatMessage('LABEL_WEIGHTED_TCV'),
        sort: true,
        sortCaret: sortCaret,
        formatter: columnFormatter,
        formatExtraData: { type: ColumnTypeEnum.currency }
      },
    ];
  };



  const DefaultSorted = [{
    dataField: 'lastModified',
    order: 'desc'
  }];

  return (
    <React.Fragment>
      <GridTableNew
        columns={getTableColumns()}
        data={gridData}
        sorting={true}
        defaultSorted={DefaultSorted}
        className="price-table"
        ActionList={[]}
        onTableChange={props.handleTableChange}
        totalSize={props.pipelineValues.totalNumberOfRecord}
      />
    </React.Fragment>
  );
};





const mapStateToProps = (state: IState) => ({
  initialValues: state.pipelineGrid.data
});

export default connect(mapStateToProps)(injectIntl(ProjectPipelineForm));