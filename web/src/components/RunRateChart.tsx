import React from 'react';

import { Doughnut, Pie, Polar } from 'react-chartjs-2';
const data = {
    datasets: [{
      data: [
        11,
        16,
        32
        
      ],
      backgroundColor: [
        '#ced0fe',
        '#7e83fe','#704ba4'
       
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Opportunities',
      'J&A',
      'Lost'
    ]
  };
export default function RunRateChart(props: {Opportunities:number, JandA:number, Lost:number}){
    return (<div>
          <Pie  data={data} />
          </div>
             );
   
   
  }
  