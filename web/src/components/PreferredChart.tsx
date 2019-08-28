import React from 'react';

import { Doughnut, Pie, Polar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';

const data = {
    datasets: [{
      data: [
        11,
        16,
        
      ],
      backgroundColor: [
        '#4cbd7f',
        '#EA8032'
       
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Preferred',
      'Not preferred'
    ]
  };
  const optionsLabels={  
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position:'bottom'
    }//, maintainAspectRatio:false     
};
export default function PreferredChart(props: {Preferred:number, NotPreferred:number}){
    return (  <Grid item xs={12} sm={12} lg={12} md={12} style={{"textAlign": 'center', "height":"100%"}} id="GridPreferredChart" >
          <Pie  data={data}  options={optionsLabels} 
        /></Grid>
        
             );
   
   
  }
  