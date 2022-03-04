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
//Chart and Infotext Component
function Sensor() {
  //setting the window title on Component Load
  window.document.title = "Home";
  //Passerpegel warning and Danger varaibles
  const WP_warning = 100;
  const WP_danger = 130;
  //user setting Drain; Verbrauchseinstellung
  const { drain } = useContext(drainContext)
  let preset = "";
  //useState Hook für Sensor Data and latest Sensor Data
  const [sensor, setSensor] = useState([]);
  const [latest, setLatest] = useState([]);
  //Fetching Lastesst Sensor Data from the API Endpoint
  const getLatest = async () => {
    await fetch("http://192.168.93.73:2000/api/latest")
      .then((res) => res.json())
      .then((data) => {
        //Setting Response as Latest
        setLatest(data);
      });
  }
    //Fetching All Sensor Data from the API Endpoint

  const getSensorData = async () => {
    await fetch("http://192.168.93.73:2000/api/get")
      .then((res) => res.json())
      .then((data) => { 
      //Setting Response as sensor, reversing the Array to supply the sensordata in the correct order (oldest - latest)
         setSensor(data.reverse()); 
      });

  }
//useEffect Hook to run the functions on Component Load
//every 6 min Auto Run of the functions to silent reload the chart and the info texts
  useEffect(() => {

    getLatest()
    getSensorData()
    const interval = setInterval(() => {
      getLatest()
      getSensorData()
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  //check preset function to gain the limits for the user setting
  preset = checkPreset(drain);
//Chart optionobject
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


//Chart Data Object
  const data = {
    //x Axes Data, TimeStamp Data formatting to hours and minutes
    labels: sensor.map((x) => { const d = new Date(x.TimeStamp); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }),
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

  return <>
    <div className="wrapper ">
      <div className="inner  ">
        <div className="mobileInfo"></div>
        <div className="sensorWrapper ">
          {/*  Latest Feuchte Data with conditional color and Text based on Data  */}
          <div className={`latestFeuchte `}>{`Bodenfeuchte :\n `}
            <span className={` ${`${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-600" : ""}`}`}>{`${latest.feuchte}%`}
            </span>
          </div>
          {/*  Latest Feuchte Data with conditional color and Text based on Data  */}

          <div className={`latestPegel `}>{`Wasserpegel:\n`}
            <span className={` ${`${latest.pegel >= WP_warning && latest.pegel < WP_danger ? "text-yellow-400" : ""}`} ${latest.pegel > WP_danger ? "text-red-600" : ""}${latest.pegel < 100 ? "text-green-600" : ""}`}>
              {`${latest.pegel >= WP_warning && latest.pegel < WP_danger ? "Die Erde ist mit ausreichend Wasser gesätigt" : ""}${latest.pegel >= WP_danger ? "Achtung!!! Die Erde hat zu viel Wasser" : ""}${latest.pegel < 100 ? "Kein Standwasser!" : ""}`}
            </span>
          </div>

        </div>
        {/* Chart div and Component*/}
        <div className="LineChart" >

          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  </>
}

export default Sensor;
