import React from 'react';
import HeaderPage from '../components/HeaderPage';
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

    constructor(props: any) {
        super(props);
    }


    render() {
        return (
            <React.Fragment>
                 <HeaderPage Title={'Pipeline'}  />
                 <Polar  data={data} />
                 
            </React.Fragment>
        );
    }
}

export default Dashboard;