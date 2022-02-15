import React, { useEffect, useState } from 'react'
import "./Status.css"
const Status = () => {
    const [sensor, setSensor] = useState([]);
    useEffect(() => {
        fetch("http://localhost:2000/api/single")
            .then((res) => res.json())
            .then((data) => { setSensor(data); console.log(data) });
    }, [])

    if (sensor.feuchte > 35) {

        <div className="Status">Status: Wasser Voll</div>

    }
    else if (sensor.feuchte < 35 && sensor.feuchte > 30) {

        <div className="Status">Status: Wasser ausreichend</div>

    }

    else if (sensor.feuchte < 30) {

        return

    }



    return (<>
        <div className="wrapper"><div className="box circle red"></div><div className="box">Wasser nachfüllen</div></div>
    </>);
}

export default Status