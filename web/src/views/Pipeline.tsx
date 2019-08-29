import React from 'react';
import HeaderPage from '../components/HeaderPage';
import ProjectsTable from '../components/ProjectsTable';
//import DatePicker from '../components/DatePicker';
import TestTable from '../components/TestTable'
import Filters from '../components/Filters'

import { Doughnut, Pie, Polar } from 'react-chartjs-2';
const data = {
    datasets: [{
      data: [
        11,
        16,
        
      ],
      backgroundColor: [
        '#4cbd7f',
        '#f3ca55'
       
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Preferred',
      'Not prefrerred',
      
    ]
  };
class Dashboard extends React.Component {
    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Pipeline'}  />
                 {/* <div>Select dates: from <DatePicker /> to <DatePicker /></div> */}
                 <Filters />
                <TestTable />
                 <ProjectsTable />
                 <Polar  data={data} />
            </React.Fragment>
        );
    }
}

export default Dashboard;