//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useContext, useState, useEffect } from "react";
import drainContext from "../../utils/drainContext";
export const checkPreset = (drain) => {
    let preset={}
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
const Navbar = () => {
    let preset = "";

    const { drain, setDrain } = useContext(drainContext);
    const [latest, setLatest] = useState([]);
    const getLatest = () => {
        fetch("http://localhost:2000/api/latest")
            .then((res) => res.json())
            .then((data) => { setLatest(data); });
    }
   



    useEffect(() => {
        getLatest();
        
    }, []); 
    preset = checkPreset(drain) 
    console.log(drain)
 
    /* const preset = { "verbrauch": { "Niedrig": { "Niedrig": "<15", "Mittel": ">15&&<20", "Hoch": ">20" }, "Mittel": { "Niedrig": "<30", "Mittel": ">30&&<35", "Hoch": ">35" }, "Hoch": { "Niedrig": "<40", "Mittel": ">40&&<45", "Hoch": ">45" } } } */

    //toggle navigation button on mobile view


    return (
        <div>
            <nav className="navbar non-printable">


                <div className={` hidden md:block ${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-400" : ""}`}>{`${latest.feuchte < preset["rot"] ? "Die Erde ist zu trocken, Bitte jetzt gießen!" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset["rot"] ? "Die Pflanze muss bald gegossen werden" : ""}${latest.feuchte > preset["gruen"] ? "Die Pflanze hat genügend Wasser" : ""}`}</div>
            </nav>
        </div>
    );
};
export default Navbar;