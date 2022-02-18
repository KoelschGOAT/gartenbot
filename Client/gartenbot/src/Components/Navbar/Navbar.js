//Beim component reload checken ob user eingeloggt
import "./Navbar.css";
import React, { useContext,useState,useEffect} from "react";
import drainContext from "../../utils/drainContext";

const Navbar = () => {
    const {drain,setDrain} = useContext(drainContext);
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
    
  
    return (
        <div>
            <nav className="navbar non-printable">

                
                <div className={` hidden md:block ${sensor.feuchte <30? "text-red-600" : ""}${sensor.feuchte >30&&sensor.feuchte <35? "text-yellow-400" : ""}${sensor.feuchte >35? "text-green-400" : ""}`}>{`${sensor.feuchte<30?"Die Erde ist zu trocken, Bitte jetzt gießen!":""}${sensor.feuchte >30&&sensor.feuchte <35? "Die Pflanze muss bald gegossen werden" : ""}${sensor.feuchte >35? "Die Pflanze hat genügend Wasser" : ""}`}</div>               
            </nav>
        </div>
    );
};
export default Navbar;