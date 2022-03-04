import React, { useEffect, useState, useContext } from 'react';
import { checkPreset } from "./Navbar/Navbar"
import drainContext from '../utils/drainContext';
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
  const WP_warning = 100;
  const WP_danger = 130;
  const { drain } = useContext(drainContext)
  let preset = {}
  const [sensor, setSensor] = useState([]);
  const [latest, setLatest] = useState([]);

  const getLatest = async () => {
    await fetch("http://192.168.93.73:2000/api/latest")
      .then((res) => res.json())
      .then((data) => { setLatest(data); });
  }
  const getSensorData = async () => {
    await fetch("http://192.168.93.73:2000/api/get")
      .then((res) => res.json())
      .then((data) => { setSensor(data.reverse()); });
      
  }

  useEffect(() => {
    getLatest()
    getSensorData()
    const interval = setInterval(() => {
      getLatest()
      getSensorData()
      }, 60000);
    
      return () => clearInterval(interval);
  }, []);
  preset = checkPreset(drain);

  const options = {

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
    labels: sensor.map((x) => { const d = new Date(x.TimeStamp); return d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); }),
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
  console.log(latest);
  return <>
    <div className="wrapper ">
      <div className="inner  ">
        <div className="mobileInfo"></div>
        <div className="sensorWrapper ">
        <div className={`latestFeuchte `}>{`Bodenfeuchte :\n `}
            <span className={` ${`${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-600" : ""}`}`}>{`${latest.feuchte}%`}
            </span>
          </div>
          <div className={`latestPegel `}>{`Wasserpegel:\n`}
            <span className={` ${`${latest.pegel >= WP_warning && latest.pegel < WP_danger ? "text-yellow-400" : ""}`} ${latest.pegel > WP_danger ? "text-red-600":""}${latest.pegel <100 ? "text-green-600":""}`}>
            {`${latest.pegel >= WP_warning && latest.pegel < WP_danger ?  "Die Erde ist mit ausreichend Wasser gesätigt" : ""}${latest.pegel >= WP_danger ? "Achtung!!! Die Erde hat zu viel Wasser" : ""}${latest.pegel < 100  ? "Kein Standwasser!" : ""}`}
            </span>
          </div>
         
        </div> 
        <div className="LineChart" >

          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  </>
}

export default Sensor;
