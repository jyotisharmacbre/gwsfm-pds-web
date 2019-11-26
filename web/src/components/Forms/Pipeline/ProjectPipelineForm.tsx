import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { connect } from 'react-redux';
import { IState } from '../../../store/state';
import TableDateFilter from '../../Table/TableDateFilter/TableDateFilter';
import CardContainer from '../../CardContainer/CardContainer';
import { display } from '@material-ui/system';

interface Props {
  pipelineValues: any;
  lookupValues: any;
}
const ProjectPipelineForm: React.FC<Props> = (props: any) => {
  const { pipelineValues, lookupValues } = props;
  console.log(lookupValues);
  const getPipelineValues = allLookups => {
    let data = pipelineValues.map(function(rowProject) {
      var statusID = rowProject.status;
      if (!isNaN(statusID) && allLookups.length > 0)
        rowProject.status = allLookups.find(
          lkp =>
            lkp.lookupItem === 'Project_Status' && lkp.lookupKey === statusID
        ).description;

      var contractID = rowProject.contractTypeId;
      if (contractID > 0 && allLookups.length > 0)
        rowProject.contractTypeId = allLookups.find(
          lk =>
            lk.lookupItem === 'Contract_Type' &&
            lk.lookupKey === contractID.toString()
        ).description;
      debugger;
      rowProject.lastModified = new Date(
        rowProject.lastModified
      ).toLocaleDateString();
      rowProject.commenceDate =
        rowProject.commenceDate != 'string' && rowProject.commenceDate != ''
          ? new Date(rowProject.commenceDate).toLocaleDateString()
          : '';
      rowProject.cdmNotifiable = rowProject.cdmNotifiable ? 'Yes' : 'No';
      rowProject.name = (
        <a href={`/projectOverview?projectId=${rowProject.projectId}`}>
          {rowProject.name}
        </a>
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
  initialValues: state.pipelineGrid.pipelineDetails
});
export default connect(mapStateToProps)(ProjectPipelineForm);
