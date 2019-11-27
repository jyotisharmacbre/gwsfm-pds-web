import React from 'react';
import HeaderPage from '../components/HeaderPage/HeaderPage';
import CardContainer from '../components/CardContainer/CardContainer';
import TableDateFilter from '../components/Table/TableDateFilter/TableDateFilter';
import Filters from '../components/Filters/Filters';
import FontawsomeSvg from '@fortawesome/fontawesome-svg-core';
import FontawsomeFree from '@fortawesome/free-solid-svg-icons';
import FontawsomeReact, {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="custom-wrap">
              <div className="top_Title">
                <h2>Current Pipeline</h2>
              </div>

              <div className="table-grid-wrap price-sumry">
                <div className="inner-block">
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>
                          Project className
                          <FontAwesomeIcon
                            className="active"
                            icon={faArrowDown}
                          />
                        </th>
                        <th>
                          Owner
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Last update
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Client/customer
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Prob of wining
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Status
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Expected start date
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Approx value
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Contact type
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          CDM notifiable
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Sold margin
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Weighted TCV
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                        <th>
                          Rank
                          <FontAwesomeIcon className="" icon={faArrowDown} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&#163;63,750</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&#163;63,750</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Leak detection improvement</td>
                        <td>Steven jones</td>
                        <td>20/04/19</td>
                        <td>JCB</td>
                        <td className="text-green">25%</td>
                        <td>J&amp;K</td>
                        <td>21/01/19</td>
                        <td>&#163;60,000</td>
                        <td>JCT</td>
                        <td>Yes</td>
                        <td className="text-green">15%</td>
                        <td>&amp;#163;63,750</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
