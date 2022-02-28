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
          color: "black",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 18 // 'size' now within object 'font {}'
          }
        }
      },


    }, color: "black",
    scales: {
      x: {
        ticks: {
          backgroundColor: 'black',
        },
      },
      y: {
        ticks: {
          color: 'black',
        },
        type: 'linear',
        display: true,
        position: 'left',

      },
      y1: {
        ticks: {
          color: 'black',
        },

        type: 'linear',
        display: true,
        position: 'none',
        color: 'black',
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
        label: 'Bodenfeuchte in %',
        data: sensor.map(x => x.feuchte),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },

    ],
  };
  console.log(sensor)
  return <>
    <div className="wrapper ">
      <div className="inner  ">
     <div className="latest ">{`Aktueller Wert: ${
    sensor.feuchte}`}</div>
      <div className="LineChart" >
              <Line options={options} data={data} />
            </div>
      </div>
    </div>
  </>
}

export default Sensor;
