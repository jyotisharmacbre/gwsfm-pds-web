import React from 'react';

import { Doughnut } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';


var optionshideLabels = {
  elements: {
    center: {
      text: '90%',
      color: '#FF6384', // Default is #000000
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 20 // Defualt is 20 (as a percentage)
    }
  }, fillText: 23423,
  cutoutPercentage: 75,

  // width:200,
  legend: {
    display: false
  }, maintainAspectRatio: false
};
export default function MultipleChart(props: { ProjectTotal: number, ICE: number, Rejected: number, JandA: number, LostProjects: number, OrderReceived: number, InProgress: number, Completed: number, OnHoldProject:number }) {
  return (<Grid container spacing={0} min-Height={350} >
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }}  >
      <div style={{ "textAlign": 'center', 'height': '320px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.ICE,
                props.ProjectTotal - props.ICE
              ],
              backgroundColor: [
                '#526061'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'Initial Customer Enquiry', 'Projects Remaining'
            ]
          }} options={optionshideLabels} />
      </div>Initial Enquiry
      </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }}  >
      <div style={{ "textAlign": 'center', 'height': '320px' }} > <Doughnut
        data={{
          datasets: [{
            data: [
              props.Rejected,
              props.ProjectTotal - props.Rejected
            ],
            backgroundColor: [
              '#CEF1A3'
            ],
            label: 'My dataset' // for legend
          }],
          labels: [
            'Rejected', 'Projects Remaining'
          ]
        }} height={300} options={optionshideLabels}
      />
      </div>Rejected</Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }} >
      <div style={{ "textAlign": 'center', 'height': '320px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.JandA,
                props.ProjectTotal - props.JandA
              ],
              backgroundColor: [
                '#FBD55B'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'J&A', 'Projects Remaining'
            ]
          }} height={300} options={optionshideLabels} />
      </div>J&A</Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }} >
      <div style={{ "textAlign": 'center', 'height': '320px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.OrderReceived,
                props.ProjectTotal - props.OrderReceived
              ],
              backgroundColor: [
                '#935FD6'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'J&A', 'Projects Remaining'
            ]
          }} options={optionshideLabels} /></div> Order Received</Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }}   >
      <div style={{ "textAlign": 'center', 'height': '320px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.InProgress,
                props.ProjectTotal - props.InProgress
              ],
              backgroundColor: [
                '#EA8032'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'J&A', 'Project Total'
            ]
          }} height={300} options={optionshideLabels} /> </div>In Progress</Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '340px' }}  >
      <div style={{ "textAlign": 'center', 'height': '320px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.Completed,
                props.ProjectTotal - props.Completed
              ],
              backgroundColor: [
                '#3DAAE9'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'J&A', 'Project Total'
            ]
          }} height={300} options={optionshideLabels} /></div>Completed </Grid>
         <Grid item xs={12} sm={12} lg={12} md={12} style={{ "textAlign": 'center'}}> Lost : 30
          On-Hold : 15 </Grid>
  </Grid>
  );


}
