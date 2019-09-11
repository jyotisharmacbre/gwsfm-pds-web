import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';import ChartDataLabels from 'chartjs-plugin-datalabels';
const Chart = require('react-chartjs-2').Chart;
Chart.plugins.unregister(ChartDataLabels);
// y
//const Chart = require('react-chartjs-2').Chart;
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart;
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var sum = 0;
    for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
      sum += chart.config.data.datasets[0].data[i];
    }

   
        if (chart.config.options.showfirstItemLabel) { var text =   chart.config.data.datasets[0].data[0] ,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
    ctx.fillText(text, textX, textY);}
  
  if (chart.config.options.showTotalLabel) { var text2 =   sum,
    textX = Math.round((width - ctx.measureText(text2).width) / 2),
    textY = height / 2;
    ctx.fillText(text2, textX, textY);}
  }
});
var optionshideLabels = {
  elements: {
    center: {
      text: '90%',
      color: '#FF6384', // Default is #000000
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 20 // Defualt is 20 (as a percentage)
    }
  }, 
  
  cutoutPercentage: 75,
  showfirstItemLabel:true,
  // width:200,
  legend: {
    display: false
  }, maintainAspectRatio: false
};
export default function MultipleChart(props: { ProjectTotal: number, ICE: number, Rejected: number, JandA: number, LostProjects: number, OrderReceived: number, InProgress: number, Completed: number, OnHoldProject:number }) {
  return (<Grid container spacing={0} min-Height={350} id="GridMultipleChart">
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  ><h4>Initial Enquiry</h4>
      <div style={{ "textAlign": 'center', 'height': '250px' }} >
        <Doughnut  type={{originalDoughnutDraw}}
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
      </div> </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  ><h4>Rejected</h4>
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
      </div> </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }} ><h4>J&A</h4>
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
      </div> </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }} ><h4>Order Received</h4>
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
          }} options={optionshideLabels} /></div> </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }} ><h4>In Progress</h4>
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
          {/* <div style={{ "textAlign": 'center', paddingTop:'-20px' }} className="{graphTitle}"><br></br>{props.InProgress} of {props.ProjectTotal} </div> */}
          </Grid>
    <Grid item xs={6} sm={6} lg={2} md={2} style={{ "textAlign": 'center', 'height': '280px' }}  ><h4>Completed</h4>
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
          
           </Grid>
         <Grid item xs={12} sm={12} lg={12} md={12} style={{ "textAlign": 'center', 'padding':'10px'}}> <h3>Lost : 30
          On-Hold : 15 </h3></Grid>
  </Grid>
  );


}
