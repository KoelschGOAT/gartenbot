import React, { useEffect, useState, useContext } from 'react';
import { checkPreset } from "./Navbar/Navbar"
import drainContext from '../utils/drainContext';
import dayjs from "dayjs";
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
  const { drain } = useContext(drainContext)
  let preset = {}
  const [sensor, setSensor] = useState([]);
  const [latest, setLatest] = useState([]);
  const getLatest = async () => {
    await fetch("http://localhost:2000/api/latest")
      .then((res) => res.json())
      .then((data) => { setLatest(data); });
  }
  const getSensorData = async () => {
    await fetch("http://localhost:2000/api/get")
      .then((res) => res.json())
      .then((data) => { setSensor(data); console.log(data) });
  }
  useEffect(() => {
    getLatest()
    getSensorData()
  }, []);
  preset = checkPreset(drain);

  const options ={  

    maintainAspectRatio: false,
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
            size: 15 // 'size' now within object 'font {}'
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
    labels: sensor.map((x) => {const d =  new Date(x.TimeStamp);return d.toLocaleTimeString() }),
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
        <div className={`latest `}>{`Aktueller Bodenfeuchte Wert: `}<span className={` ${`${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-400" : ""}`}`}>{`${latest.feuchte}%`}</span></div>
        <div className="LineChart" >
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  </>
}

export default Sensor;
