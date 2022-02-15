import React, { useEffect, useState } from 'react';
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
          color: "white",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 18 // 'size' now within object 'font {}'
          }
        }
      },
     
    
    },color:"white",
    scales: {
      x:{
        ticks:{
          backgroundColor:'white',
        },
      },
      y: {
        ticks:{
          color:'white',
        },
        type: 'linear',
        display: true,
        position: 'left',
        
        },
      y1: {
        ticks:{
          color:'white',
        },
      
        type: 'linear',
        display: true,
        position: 'right',
        color:'white',
        grid: {
          drawOnChartArea: false,
        },
        
         
      
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
      {
        label: 'Wasserpegel',
        data: sensor.map(x => x.pegel),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  return <><div className="output">{JSON.stringify(sensor, 2, null)}</div>


    <div className="LineChart" ><Line options={options} data={data}/></div></>
}

export default Sensor;
