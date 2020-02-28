import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ColumnTypeEnum from '../../../enums/ColumnTypeEnum';
import { LookupItems } from '../../../helpers/constants';
import { columnFormatter, sortCaret } from '../../../helpers/table-helper';
import { displayUserName, getFilterElementFromArray, getLookupDescription, getPropertyName } from '../../../helpers/utility-helper';
import IQueryParams from '../../../models/tableQueryParams/IQueryParams';
import { IDynamicContractCustomerData } from '../../../store/DynamicsData/Types/IDynamicData';
import Currency from '../../../store/Lookups/InitialState/Currency';
import { ICurrency } from '../../../store/Lookups/Types/ICurrency';
import { IProjectPipelineGrid } from '../../../store/pipeline/Types/IProjectPipelineGrid';
import { IProjectPipelineGridState } from '../../../store/pipeline/Types/IProjectPipelineGridState';
import { IState } from '../../../store/state';
import { IUserServiceData } from '../../../store/UserService/Types/IUserService';
import { formatMessage } from '../../../Translations/connectedIntlProvider';
import IReactIntl from '../../../Translations/IReactIntl';
import DataGrid from '../../Table/DataGrid';
import gridColumns from './Column.config'

interface Props {
  pipelineValues: IProjectPipelineGridState;
  lookupValues: any;
  currencies: Array<ICurrency> | null;
  userNamesForEmailsValues: Array<IUserServiceData>;
  contractCustomerList: Array<IDynamicContractCustomerData>;
  handleTableChange: (type, params) => void;
  queryParams: IQueryParams;
  defaultSorted: any;
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

  return (
    <React.Fragment>
      <DataGrid
        columns={gridColumns()}
        data={gridData}
        sorting={true}
        defaultSorted={props.defaultSorted}
        className="price-table"
        ActionList={[]}
        onTableChange={props.handleTableChange}
        totalSize={props.pipelineValues.totalNumberOfRecord}
        queryParams={props.queryParams}
        intl={props.intl}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.pipelineGrid.data
});

export default connect(mapStateToProps)(injectIntl(ProjectPipelineForm));