import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import TableDateFilter from '../../Table/TableDateFilter/TableDateFilter';
import CardContainer from '../../CardContainer/CardContainer';
import { display } from '@material-ui/system';
import { getLookupDescription } from '../../../helpers/utility-helper';
import { LookupItems } from '../../../helpers/constants';
import moment from 'moment';
import { setProjectId } from '../../../store/CustomerEnquiryForm/Action';
import { useHistory } from 'react-router-dom';
import Notify from '../../../enums/Notify';

interface Props {
  pipelineValues: any;
  lookupValues: any;
}
const ProjectPipelineForm: React.FC<Props> = (props: any) => {
  const { pipelineValues, lookupValues } = props;
  let history = useHistory();
  useEffect(() => {
    debugger;
    if (props.projectIdUpdated == Notify.success)
      history.push('/ProjectOverview');
  }, [props.projectIdUpdated]);
  const getPipelineValues = allLookups => {
    let data = pipelineValues.map(function(rowProject) {
      var statusID = rowProject.status;
      if (!isNaN(statusID) && allLookups.length > 0)
        rowProject.status = getLookupDescription(
          allLookups,
          rowProject.status,
          LookupItems.Project_Status
        );

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
      rowProject.commenceDate =
        rowProject.commenceDate != ''
          ? moment(rowProject.commenceDate).format('MM/DD/YYYY')
          : '';

      rowProject.cdmNotifiable = rowProject.cdmNotifiable ? 'Yes' : 'No';

      rowProject.name = (
        <button
          onClick={() => {
            setProjectId(rowProject.projectId);
          }}
        >
          {rowProject.name}
        </button>
      );
      return rowProject;
    });
    return data;
  };
  return (
    <React.Fragment>
      <CardContainer Title="Current Pipeline">
        <TableDateFilter
          columns={getTableColumns()}
          data={getPipelineValues(lookupValues)}
          ActionList={[]}
        />
      </CardContainer>
    </React.Fragment>
  );
};
const getTableColumns = () => {
  return [
    {
      title: 'Project name',
      field: 'name',
      customFilterAndSearch: (term: any, rowData: any) =>
        (term = rowData.name.length)
    },
    { title: 'Owner', field: 'projectOwner' },
    { title: 'Last Update', field: 'lastModified' },
    {
      title: 'Client/customer',
      field: 'contractorId'
    },
    {
      title: 'Prob of winning',
      field: 'probabilityOfWinning'
    },
    {
      title: 'Status',
      field: 'status'
    },
    {
      title: 'Expected start date',
      field: 'commenceDate',
      type: 'date'
    },
    {
      title: 'Approx value',
      field: 'approxValue'
    },
    {
      title: 'Contract type',
      field: 'contractTypeId'
    },
    {
      title: 'CMD notifiable',
      field: 'cdmNotifiable'
    },
    {
      title: 'Sold margin',
      field: 'soldmargin'
    },
    {
      title: 'Weighted TCV',
      field: 'weightedTCV'
    },
    {
      title: 'Rank',
      field: 'rank'
    }
  ];
};

const mapStateToProps = (state: IState) => ({
  initialValues: state.pipelineGrid.pipelineDetails,
  projectIdUpdated: state.project.projectIdUpdated
});
export default connect(mapStateToProps)(ProjectPipelineForm);
