import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';import ChartDataLabels from 'chartjs-plugin-datalabels';
const Chart = require('react-chartjs-2').Chart;
Chart.plugins.unregister(ChartDataLabels);
// y

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
  return (<Grid container spacing={0} min-Height={350} id="GridMultipleChart">
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  >
      <div style={{ "textAlign": 'center', 'height': '250px' }} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.ICE,
                props.ProjectTotal - props.ICE
              ],
              backgroundColor: [
                '#CEF1A3'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'Initial Customer Enquiry', 'Other Projects'
            ]
          }} options={optionshideLabels} />
      </div><div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">Initial Enquiry<br></br>{props.ICE} of {props.ProjectTotal} </div>
      </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  >
      <div style={{ "textAlign": 'center', 'height': '250px' }} > <Doughnut
        data={{
          datasets: [{
            data: [
              props.Rejected,
              props.ProjectTotal - props.Rejected
            ],
            backgroundColor: [
              '#FBD55B'
            ],
            label: 'My dataset' // for legend
          }],
          labels: [
            'Rejected', 'Other Projects'
          ]
        }} height={300} options={optionshideLabels}
      />
      </div><div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">Rejected<br></br>{props.Rejected} of {props.ProjectTotal} </div>
  </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }} >
      <div style={{ "textAlign": 'center', 'height': '250px'}} >
        <Doughnut
          data={{
            datasets: [{
              data: [
                props.JandA,
                props.ProjectTotal - props.JandA
              ],
              backgroundColor: [
                '#526061'
              ],
              label: 'My dataset' // for legend
            }],
            labels: [
              'J&A', 'Other Projects'
            ]
          }} height={300} options={optionshideLabels} />
      </div><div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">J&A<br></br>{props.JandA} of {props.ProjectTotal} </div>
  </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }} >
      <div style={{ "textAlign": 'center', 'height': '250px'}}>
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
              'Order Received', 'Other Projects'
            ]
          }} options={optionshideLabels} /></div><div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">Order Received<br></br>{props.OrderReceived} of {props.ProjectTotal} </div>
          </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}   >
      <div style={{ "textAlign": 'center', 'height': '250px'}} >
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
              'In Progress', 'Other Projects'
            ]
          }} height={300} options={optionshideLabels} /> </div>
          <div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">In Progress<br></br>{props.InProgress} of {props.ProjectTotal} </div>
          </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  >
      <div style={{ "textAlign": 'center', 'height': '250px'}} >
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
              'J&A', 'Other Projects'
            ]
          }} height={300} options={optionshideLabels} /></div>
          
          <div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}">Completed<br></br>{props.Completed} of {props.ProjectTotal} </div>
   </Grid>
         <Grid item xs={12} sm={12} lg={12} md={12} style={{ "textAlign": 'center', 'padding':'10px'}}> Lost : 30
          On-Hold : 15 </Grid>
  </Grid>
  );


}
