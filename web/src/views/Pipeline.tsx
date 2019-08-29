import React from 'react';
import HeaderPage from '../components/HeaderPage';
import ProjectsTable from '../components/ProjectsTable';
import CardContainer from '../components/CardContainer';
//import DatePicker from '../components/DatePicker';

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
                  <CardContainer Title="Your Projects">
                 <ProjectsTable />
                 </CardContainer>
                 <Polar  data={data} />

            </React.Fragment>
        );
    }
}

export default Dashboard;