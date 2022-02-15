//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [sensor, setSensor] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2000/api/single")
            .then((res) => res.json())
            .then((data) => { setSensor(data); console.log(data) });
        
    }, [])
    //toggle navigation button on mobile view
    const [isActive, setIsActive] = useState(false);
    const handleOnClick = () => {
        setIsActive(!isActive);
    };

    const handleOnCheck = (e) => {
        isActive ? setIsActive(false) : setIsActive(true);
    }
    const status=() => {
        if (sensor.feuchte > 35) {
            console.log(sensor.feuchte);
           return "green"
        }
        else if (sensor.feuchte < 35 && sensor.feuchte > 30) {
            console.log(sensor.feuchte); 
            return "yellow"
        }
    
        else if (sensor.feuchte < 30) {
            console.log(sensor.feuchte);
            return "red"
    
        }
    }
    return (
        <div>
            <nav className="navbar non-printable">

                <div>
                    <li className="brand-title gradient"><Link to="/">Gartenbot</Link></li>
                </div>
                
                <div className={sensor.feuchte<30?"status red":"status green"}>{sensor.feuchte<30?"Wasser nachfüllen":"Wasser voll"}</div>


                <a href="#" className="toggle-button" onClick={() => handleOnClick()}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className={isActive ? "navbar-links active" : "navbar-links"}>
                    <ul>
                        

                        <li>
                            <Link to="/" onClick={() => handleOnCheck()}>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/settings" onClick={() => handleOnCheck()}>
                                Einstellungen
                            </Link>
                        </li>

                        <li>
                            <Link to="/handout" onClick={() => handleOnCheck()}>
                                Platzhalter
                            </Link>
                        </li>


                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;