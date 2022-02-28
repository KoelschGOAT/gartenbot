//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useContext, useState, useEffect } from "react";
import drainContext from "../../utils/drainContext";

const Navbar = () => {
    let preset = "";

    const { drain, setDrain } = useContext(drainContext);
    const [sensor, setSensor] = useState([]);
    const getLatest = () => {
        fetch("http://localhost:2000/api/latest")
            .then((res) => res.json())
            .then((data) => { setSensor(data); });
    }
    const checkPreset = (drain) => {
        if (drain === "Niedrig"){
            preset={
                "rot": 15,  "gruen": 20
            }

        }
        else if (drain === "Mittel") {
            preset={
                "rot": 30,"gruen": 35
            }

        }
        else if (drain === "Hoch") {
            preset={
                "rot": 40,"gruen": 45
            }
        } return preset

    }



    useEffect(() => {
        getLatest();
        
    }, []); 
    preset = checkPreset(drain) 
 
    /* const preset = { "verbrauch": { "Niedrig": { "Niedrig": "<15", "Mittel": ">15&&<20", "Hoch": ">20" }, "Mittel": { "Niedrig": "<30", "Mittel": ">30&&<35", "Hoch": ">35" }, "Hoch": { "Niedrig": "<40", "Mittel": ">40&&<45", "Hoch": ">45" } } } */

    //toggle navigation button on mobile view


    return (
        <div>
            <nav className="navbar non-printable">


                <div className={` hidden md:block ${sensor.feuchte < preset["rot"] ? "text-red-600" : ""}${sensor.feuchte <= preset["gruen"] && sensor.feuchte >= preset?.rot ? "text-yellow-400" : ""}${sensor.feuchte > preset["gruen"] ? "text-green-400" : ""}`}>{`${sensor.feuchte < preset["rot"] ? "Die Erde ist zu trocken, Bitte jetzt gießen!" : ""}${sensor.feuchte <= preset["gruen"] && sensor.feuchte >= preset["rot"] ? "Die Pflanze muss bald gegossen werden" : ""}${sensor.feuchte > preset["gruen"] ? "Die Pflanze hat genügend Wasser" : ""}`}</div>
            </nav>
        </div>
    );
};
export default Navbar;