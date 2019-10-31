import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import CardContainer from '../components/CardContainer/CardContainer';
import TableDateFilter from '../components/Table/TableDateFilter/TableDateFilter';
import Filters from '../components/Filters/Filters';

// const data = {
//     datasets: [{
//         data: [
//             11,
//             16,

//         ],
//         backgroundColor: [
//             '#4cbd7f',
//             '#f3ca55'

//         ],
//         label: 'My dataset' // for legend
//     }],
//     labels: [
//         'Preferred',
//         'Not prefrerred',

//     ]
// };

const getTableColumns = () => {
  return [
    {
      title: 'Project name',
      field: 'projectname',
      customFilterAndSearch: (term: any, rowData: any) =>
        (term = rowData.name.length)
    },
    { title: 'Owner', field: 'owner' },
    { title: 'List Update', field: 'listupdate', type: 'date' },
    {
      title: 'Client/customer',
      field: 'clientcustomer'
    },
    {
      title: 'Prob of winning',
      field: 'probofwinning'
    },
    {
      title: 'Status',
      field: 'status'
    },
    {
      title: 'Expected start date',
      field: 'expectedstartdate',
      type: 'date'
    },
    {
      title: 'Approx value',
      field: 'approxvalue'
    },
    {
      title: 'Contract type',
      field: 'contracttype'
    },
    {
      title: 'CMD notifiable',
      field: 'cmdnotificable'
    },
    {
      title: 'Sold margin',
      field: 'soldmargin'
    },
    {
      title: 'Weighted TCV',
      field: 'weightedtcv'
    },
    {
      title: 'Rank',
      field: 'rank'
    }
  ];
};

const getTableData = () => {
  return [
    {
      projectname: 'Leak detection improvement',
      owner: 'Stacy Salter',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'JCB',
      probofwinning: '25%',
      status: 'J&A',
      expectedstartdate: new Date('12/21/2019'),
      approxvalue: '$70,000',
      contracttype: 'JCT',
      cmdnotificable: 'Yes',
      soldmargin: '15%',
      weightedtcv: '$96,000',
      rank: '1'
    },
    {
      projectname: 'Generator replacement',
      owner: 'Imran Khan',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'TLD',
      probofwinning: '25%',
      status: 'J&A',
      expectedstartdate: new Date('1/2/2019'),
      approxvalue: '$50,000',
      contracttype: 'JCT',
      cmdnotificable: 'Yes',
      soldmargin: '55%',
      weightedtcv: '$43,000',
      rank: '3'
    },
    {
      projectname: 'Improvements',
      owner: 'Joice Ronald',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'PWC',
      probofwinning: '25%',
      status: 'J&A',
      expectedstartdate: new Date('9/2/2019'),
      approxvalue: '$660,000',
      contracttype: 'JCT',
      cmdnotificable: 'Yes',
      soldmargin: '15%',
      weightedtcv: '$93,000',
      rank: '1'
    },
    {
      projectname: 'Alteration programme',
      owner: 'Bevely Thomas',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'HSBC',
      probofwinning: '25%',
      status: 'CPP',
      expectedstartdate: new Date('12/21/2019'),
      approxvalue: '$67,000',
      contracttype: 'JCT',
      cmdnotificable: 'Yes',
      soldmargin: '15%',
      weightedtcv: '$63,000',
      rank: '1'
    },
    {
      projectname: 'Leak prevention',
      owner: 'Grace Jones',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'ING',
      probofwinning: '25%',
      status: 'J&A',
      expectedstartdate: new Date('4/21/2019'),
      approxvalue: '$90,000',
      contracttype: 'JCT',
      cmdnotificable: 'No',
      soldmargin: '35%',
      weightedtcv: '$843,000',
      rank: '2'
    },
    {
      projectname: 'Site clearance',
      owner: 'Stacy Salter',
      listupdate: new Date('07/21/2019'),
      clientcustomer: 'JCB',
      probofwinning: '25%',
      status: 'J&A',
      expectedstartdate: new Date('8/21/2019'),
      approxvalue: '$40,000',
      contracttype: 'JCT',
      cmdnotificable: 'Yes',
      soldmargin: '5%',
      weightedtcv: '$63,000',
      rank: '1'
    }
  ];
};

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeaderPage Title={'Pipeline'} />
        <Filters></Filters>
        <CardContainer Title="Current Pipeline">
          <TableDateFilter
            columns={getTableColumns()}
            data={getTableData()}
            ActionList={[]}
          />
        </CardContainer>
      </React.Fragment>
    );
  }
}

export default Dashboard;
