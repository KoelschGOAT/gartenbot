//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [sensor, setSensor] = useState([]);
    const getLatest =() => {
        fetch("http://localhost:2000/api/latest")
        .then((res) => res.json())
        .then((data) => { setSensor(data); });
    }
    useEffect(() => {
       
        getLatest();
    }, [])
    //toggle navigation button on mobile view
    const [isActive, setIsActive] = useState(false);
    const handleOnClick = () => {
        setIsActive(!isActive);
    };

    const handleOnCheck = (e) => {
        isActive ? setIsActive(false) : setIsActive(true);
    }
   console.log(sensor)
    return (
        <div>
            <nav className="navbar non-printable">

                
                <div className={sensor.feuchte<30?"text-red-600":" text-green-600"}>{sensor.feuchte<30?"Wasser nachfüllen":"Wasser voll"}</div>


               
               
            </nav>
        </div>
    );
};
export default Navbar;