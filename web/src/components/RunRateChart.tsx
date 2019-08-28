import React from 'react';

import { Doughnut, Pie, Polar, Bubble, Line } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import LostRunRateChart from './LostRunRateChart';
import OnHoldRunRateChart from './OnHoldRunRateChart';
const dataProjectStatus = {
    datasets: [{
      data: [
        23,
        16,
        32,12,10,12
        
      ],
      backgroundColor: [
        '#CEF1A3',
        '#526061','#FBD55B', '#935FD6',
        '#EA8032','#3DAAE9'
       
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Initial Customer Enquiry',
      'J&A',
      'Bid Submitted','Order Received','In Progress','Completed'
      //ICE, J&A, Bid Submitted, Order Received, In Progress and Completed
    ]
  };
  
  const optionsLabels={  
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position:'bottom'
    }};

export default function RunRateChart(props: {ICE:number, JandA:number, BidSubmitted:number, OrderReceived:number, InProgress:number , Completed:number}){
    return (  <Grid container spacing={0} style={{"height":"100%"}} id="GridRunRateChart">   <Grid item xs={12} sm={12} lg={6} md={6} style={{"height":"100%","verticalAlign": "middle"}} >
          <Polar
  data={dataProjectStatus}   width={50}
  height={60} options={optionsLabels}  /> </Grid>    <Grid item xs={12} sm={12} lg={6} md={6} style={{"textAlign": 'center'}} id="GridLostRunRateChart" >
        <h4>Lost </h4><LostRunRateChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20}/><h4>On-Hold </h4>     
          <OnHoldRunRateChart ICE={56} JandA={12} BidSubmitted={30} OrderReceived={20} InProgress={24} Completed={20}/>      
        </Grid>
          </Grid>
             );
   
   
  }
  