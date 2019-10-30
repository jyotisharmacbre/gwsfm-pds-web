import React from 'react';

import { Doughnut } from 'react-chartjs-2';

const dataLost = {
  datasets: [
    {
      data: [4, 2, 7, 9, 23, 2],
      backgroundColor: [
        // '#ced0fe',
        // '#7e83fe','#704ba4', '#4cbd7f',
        // '#f3ca55'
        '#CEF1A3',
        '#526061',
        '#FBD55B',
        '#935FD6',
        '#EA8032',
        '#3DAAE9'
      ],
      label: 'My dataset' // for legend
    }
  ],
  labels: [
    'Initial Customer Enquiry',
    'J&A',
    'Bid Submitted',
    'Order Received',
    'In Progress',
    'Completed'
    //ICE, J&A, Bid Submitted, Order Received, In Progress and Completed
  ]
};

const optionshideLabels = {
  showTotalLabel: true,
  cutoutPercentage: 70,
  legend: {
    display: false
  } //, maintainAspectRatio:false
};

export default function LostRunRateChart(props: {
  ICE: number;
  JandA: number;
  BidSubmitted: number;
  OrderReceived: number;
  InProgress: number;
  Completed: number;
}) {
  return <Doughnut data={dataLost} options={optionshideLabels} />;
}
