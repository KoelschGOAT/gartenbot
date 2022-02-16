import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

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
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:2000/api/get")
      .then((res) => res.json())
      .then((data) => { setSensor(data); console.log(data) });
    fetch("http://localhost:2000/api/user")
      .then((res) => res.json())
      .then((data) => { setUser(data); console.log(data) });

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
  const data2 = {
    labels: sensor.map(x => x.TimeStamp),
    datasets: [

      {
        label: 'Wasserpegel in %',
        data: sensor.map(x => x.pegel),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
      },
    ],
  };
  return <>

    <Box><Card className="card"><CardContent><div className="LineChart" ><Line options={options} data={data} /></div></CardContent></Card></Box>

    <Box ><Card className="card w-50 h-100   justify-center" variant="outlined"><CardContent><div className="LineChart" ><Line options={options2} data={data2} /></div></CardContent></Card></Box>
   
  </>
}

export default Sensor;
