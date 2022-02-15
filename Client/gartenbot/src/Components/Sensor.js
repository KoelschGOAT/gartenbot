import React, { useEffect, useState } from 'react';
import Status from "./Status"
import './sensor.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';



ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Sensor() {
  const [sensor, setSensor] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2000/api/get")
      .then((res) => res.json())
      .then((data) => { setSensor(data); console.log(data) });
  }, []);


  const options = {
   
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        labels: {
          color: "black",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 18 // 'size' now within object 'font {}'
          }
        }
      },
     
    
    },color:"black",
    scales: {
      x:{
        ticks:{
          backgroundColor:'black',
        },
      },
      y: {
        ticks:{
          color:'black',
        },
        type: 'linear',
        display: true,
        position: 'left',
        
        },
      y1: {
        ticks:{
          color:'black',
        },
      
        type: 'linear',
        display: true,
        position: 'none',
        color:'black',
        grid: {
          drawOnChartArea: false,
        },
        
         
      
      },
    },
  };
  const options2 = {
   
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        labels: {
          color: "black",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 18 // 'size' now within object 'font {}'
          }
        }
      },
     
    
    },color:"black",
    scales: {
      x:{
        ticks:{
          backgroundColor:'black',
        },
      },
      y: {
        ticks:{
          color:'black',
        },
        type: 'linear',
        display: true,
        position: 'left',
        
        },
      
    },
  };



  const data = {
    labels: sensor.map(x => x.TimeStamp),
    datasets: [
      {
        label: 'Bodenfeuchte',
        data: sensor.map(x => x.feuchte),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      
    ],
  };
  const data2 = {
    labels: sensor.map(x => x.TimeStamp),
    datasets: [
      
      {
        label: 'Wasserpegel',
        data: sensor.map(x => x.pegel),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };
  return <><div className="output text-black">{JSON.stringify(sensor, 2, null)}</div>

  
    <div className="LineChart" ><Line options={options} data={data}/></div>
    <div className="LineChart" ><Line options={options2} data={data2}/></div>
    </>
}

export default Sensor;
