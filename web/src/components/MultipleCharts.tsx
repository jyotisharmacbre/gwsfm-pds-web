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
    var optionshideLabels={  
 
      legend: {
        display: false
      }//, maintainAspectRatio:false     
};
export default function MultipleChart(props: {ICE:number, JandA:number, BidSubmitted:number, OrderReceived:number, InProgress:number , Completed:number}){
    return (  <Grid container spacing={2} style={{"height":"100%"}}>   <Grid item xs={12} sm={12} lg={3} md={3} style={{"height":"100%","verticalAlign": "middle"}} >
          <Doughnut
  data={dataProjectStatus}   options={optionshideLabels}  /> </Grid>    <Grid item xs={12} sm={12} lg={3} md={3} style={{"height":"100%","verticalAlign": "middle"}} >
  <Doughnut
data={dataProjectStatus}  options={optionshideLabels}  /> </Grid>    <Grid item xs={12} sm={12} lg={3} md={3} style={{"height":"100%","verticalAlign": "middle"}} >
<Doughnut
data={dataProjectStatus} options={optionshideLabels}  /> </Grid>    <Grid item xs={12} sm={12} lg={3} md={3} style={{"height":"100%","verticalAlign": "middle"}} >
<Doughnut
data={dataProjectStatus}    options={optionshideLabels}  /> </Grid>  
          </Grid>
             );
   
   
  }
  