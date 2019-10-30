import React from 'react';

import { Doughnut } from 'react-chartjs-2';

const dataOnHold = {
  datasets: [
    {
      data: [56, 23, 3, 45, 56, 12],
      backgroundColor: [
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
var optionshideLabels = {
  showTotalLabel: true,
  cutoutPercentage: 70,
  legend: {
    display: false
  } //, maintainAspectRatio:false
};

export default function OnHoldRunRateChart(props: {
  ICE: number;
  JandA: number;
  BidSubmitted: number;
  OrderReceived: number;
  InProgress: number;
  Completed: number;
}) {
  return <Doughnut data={dataOnHold} options={optionshideLabels} />;
}
