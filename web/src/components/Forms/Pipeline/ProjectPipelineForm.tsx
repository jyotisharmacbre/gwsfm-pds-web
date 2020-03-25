import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LookupItems } from '../../../helpers/constants';
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
import DataGrid from '../../Table/DataGrid/DataGrid';
import gridColumns from './Column.config';
import IFilterParams from '../../../models/tableQueryParams/IFilterParams';
import ProjectPipelineFilters from './ProjectPipelineFilters';
import { CircularProgress } from '@material-ui/core';
import excelIcon from '../../../assests/images/excel_icon.svg';
interface Props {
  pipelineValues: IProjectPipelineGridState;
  lookupValues: any;
  currencies: Array<ICurrency> | null;
  userNamesForEmailsValues: Array<IUserServiceData>;
  contractCustomerList: Array<IDynamicContractCustomerData>;
  handleTableChange: (type, params) => void;
  onApplyFilter: (filterParamsList: Array<IFilterParams>) => void;
  exportToExcelPipelineData: () => void;
  exportLoader: boolean;
  applyFilterLoader: boolean;
  queryParams: IQueryParams;
}

const ProjectPipelineForm: React.FC<Props & IReactIntl> = (props: any) => {
  const CurrencyObj = new Currency();
  const [gridData, setGridData] = useState<Array<IProjectPipelineGrid>>([]);
  useEffect(
    () => {
      if (
        props.pipelineValues?.data?.length > 0 && props.pipelineValues.data[0].projectId !== '' &&
        props.currencies?.length > 0
      ) {
        const pipelineData = JSON.parse(JSON.stringify(props.pipelineValues.data));
        setGridData(
          getPipelineValues(
            pipelineData,
            props.currencies,
            props.userNamesForEmailsValues,
            props.contractCustomerList
          ));
      }
      else {
        setGridData([]);
      }
    },
    [props.pipelineValues, props.currencies, props.userNamesForEmailsValues, props.contractCustomerList]

  );

  const getUserDetails = (userEmail, usersDetails) => {
    return userEmail && usersDetails?.find(
      lk => lk.email?.toUpperCase() === userEmail.toUpperCase()
    );
  }
  const getPipelineValues = (pipelineData, currencies, namesAndEmails, contractCustomerList) => {
    let data = pipelineData.map(function (rowProject) {
      if (namesAndEmails && namesAndEmails.length > 0) {
        const projectOwnerDetail = getUserDetails(rowProject.projectOwner, namesAndEmails);
        rowProject.projectOwner = projectOwnerDetail
          ? `${displayUserName(projectOwnerDetail)}`
          : rowProject.projectOwner;

        const headOfProjectDetail = getUserDetails(rowProject.headOfProject, namesAndEmails);
        rowProject.headOfProject = headOfProjectDetail
          ? `${displayUserName(headOfProjectDetail)}`
          : rowProject.headOfProject;
      }
      var customerObj = contractCustomerList && rowProject.contractorId && contractCustomerList.find(
        lk => lk.contractId && rowProject.contractorId && lk.contractId?.toString().toUpperCase() === rowProject.contractorId?.toString().toUpperCase()
      );
      rowProject.contractorId = customerObj ? customerObj.customerName : rowProject.contractorId;
      const currencySymbol = getFilterElementFromArray(
        currencies,
        getPropertyName(CurrencyObj, (prop) => prop.currencyId),
        rowProject.currencyId,
        getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
      );
      rowProject.approxValue = rowProject.approxValue.toString().indexOf(currencySymbol) > -1 ? rowProject.approxValue : `${currencySymbol}${rowProject.approxValue}`;
      rowProject.lastModified = moment(rowProject.lastModified);
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
      <ProjectPipelineFilters
        onApplyFilter={props.onApplyFilter}
        lookupValues={props.lookupValues}
        applyFilterLoader={props.applyFilterLoader}
        data-test="ProjectPipelineFilters"
      />
      <div className="top_Title justify-content-between d-flex">
        <h2>{formatMessage('TITLE_CURRENT_PIPELINE')}</h2>
        <span>
          <button
            className="active excel_icon"
            type="button"
            onClick={() => props.exportToExcelPipelineData()}
            disabled={props.exportLoader}
            data-test="export_to_excel"
          >
            {props.exportLoader && <CircularProgress />}
            <img src={excelIcon} alt="microsoft excel icon" />
          </button>
        </span>
      </div>
      <DataGrid
        columns={gridColumns()}
        data={gridData}
        sorting={true}
        pagination={true}
        className="price-table"
        ActionList={[]}
        onTableChange={props.handleTableChange}
        totalSize={props.pipelineValues?.totalNumberOfRecord}
        queryParams={props.queryParams}
        intl={props.intl}
        data-test="pipelineDataGrid"
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.pipelineGrid.data
});

export default connect(mapStateToProps)(injectIntl(ProjectPipelineForm));