import React from 'react';

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
      'Not preferred'
    ]
  };
export default function PreferredChart(props: {Preferred:number, NotPreferred:number}){
    return (<div >
          <Polar  data={data} />
          </div>
             );
   
   
  }
  