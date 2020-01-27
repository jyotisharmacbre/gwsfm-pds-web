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
interface Props {
  pipelineValues: any;
  lookupValues: any;
  currencies: Array<ICurrency> | null;
  userNamesForEmailsValues:Array<IUserServiceData>;
}
const ProjectPipelineForm: React.FC<Props & IReactIntl> = (props: any) => {
  const CurrencyObj = new Currency();
  const { pipelineValues, lookupValues, currencies } = props;
  const [gridData, setGridData] = useState<Array<IProjectPipelineGrid>>([]);
	useEffect(
		() => {
			if (
				props.pipelineValues &&
				props.currencies?.length>0  &&
				props.lookupValues &&
				props.userNamesForEmailsValues?.length>0
			) {
				setGridData(
					getPipelineValues(
            props.pipelineValues,
            props.lookupValues,
            props.currencies,
						props.userNamesForEmailsValues,
					)
				);
			}
		},
		[props.pipelineValues,props.lookupValues,props.currencies,props.userNamesForEmailsValues]
	);
  const getPipelineValues = (pipelineData,allLookups, currencies,namesAndEmails) => {
    let data = pipelineData.map(function (rowProject) {
      var mailObj =namesAndEmails && rowProject.projectOwner && namesAndEmails.find(
        lk =>lk.email && rowProject.projectOwner && lk.email.toUpperCase() === rowProject.projectOwner.toUpperCase()
      );
      rowProject.projectOwner =mailObj && mailObj
						? `${displayUserName(mailObj)}`
						: rowProject.projectOwner;
      var statusID = rowProject.status;
      if (!isNaN(statusID) && allLookups.length > 0 )
        rowProject.status = getLookupDescription(
          allLookups,
          rowProject.status,
          LookupItems.Project_Status
        );
      const currencySymbol = getFilterElementFromArray(
        currencies,
        getPropertyName(CurrencyObj, (prop) => prop.currencyId),
        rowProject.currencyId,
        getPropertyName(CurrencyObj, (prop) => prop.currencySymbol)
      );
      rowProject.approxValue = `${currencySymbol}${rowProject.approxValue}`;
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
      rowProject.weightedTCV = `${currencySymbol}${rowProject.weightedTCV ? rowProject.weightedTCV : 0}`;
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
      <GridTable
        columns={getTableColumns()}
        data={gridData}
        sorting={true}
        className="price-table"
        ActionList={[]}
      />
    </React.Fragment>
  );
};

const getTableColumns = () => {
  return [
    {
      title: formatMessage('MESSAGE_PROJECT_NAME'),
      field: 'name',
      customFilterAndSearch: (term: any, rowData: any) =>
        (term = rowData.name.length)
    },
    { title: formatMessage('LABEL_OWNER'), field: 'projectOwner' },
    { title: 'Last Update', field: 'lastModified' },
    {
      title: formatMessage('LABEL_CLIENT_CUSTOMER'),
      field: 'contractorId'
    },
    {
      title: formatMessage('LABEL_PROBABILITY_OF_WINING'),
      field: 'probabilityOfWinning',
      type: ColumnTypeEnum.percentage
    },
    {
      title: formatMessage('LABEL_STATUS'),
      field: 'status'
    },
    {
      title: formatMessage('LABEL_EXPECTED_START_DATE'),
      field: 'commenceDate',
      type: ColumnTypeEnum.date
    },
    {
      title: formatMessage('LABEL_APPROX_VALUE'),
      field: 'approxValue',
      type: ColumnTypeEnum.currency
    },
    {
      title: formatMessage('LABEL_CONTRACT_TYPE'),
      field: 'contractTypeId'
    },
    {
      title: formatMessage('LABEL_CMD_NOTIFIABLE'),
      field: 'cdmNotifiable'
    },
    {
      title: formatMessage('LABEL_SOLD_MARGIN'),
      field: 'soldMargin',
      type: ColumnTypeEnum.percentage
    },
    {
      title: formatMessage('LABEL_WEIGHTED_TCV'),
      field: 'weightedTCV',
      type: ColumnTypeEnum.currency
    }
  ];
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.pipelineGrid.pipelineDetails
});

export default connect(mapStateToProps)(injectIntl(ProjectPipelineForm));