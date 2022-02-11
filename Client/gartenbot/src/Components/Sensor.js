import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19 ],
      backgroundColor: [
        
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
       
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
function Sensor() {
  const [sensor, setSensor] = useState([]);
  useEffect(() => {
    fetch("http://192.168.178.142:2000/api/get")
      .then((res) => res.json())
      .then((data) => setSensor(data));
  }, []);
  return <><div>{JSON.stringify(sensor, 2, null)}</div>
 

<Pie data = {data} /></>
}

export default Sensor;
