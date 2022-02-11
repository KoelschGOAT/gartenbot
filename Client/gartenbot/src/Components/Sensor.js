import React, { useEffect, useState } from "react";

function Sensor() {
  const [sensor, setSensor] = useState([]);
  useEffect(() => {
    fetch("http://192.168.178.142:2000/api/get")
      .then((res) => res.json())
      .then((data) => setSensor(data));
  }, []);
  return <div>{JSON.stringify(sensor, 2, null)}</div>;
}

export default Sensor;
