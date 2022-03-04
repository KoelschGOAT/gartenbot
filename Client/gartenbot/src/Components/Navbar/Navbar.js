import "./Navbar.css";
import React, { useContext, useState, useEffect } from "react";
import drainContext from "../../utils/drainContext";
//Function to get the Data for each userSetting drain
export const checkPreset = (drain) => {
    let preset = {}
    if (drain === "Niedrig") {
        preset = {
            "rot": 15, "gruen": 20
        }

    }
    else if (drain === "Mittel") {
        preset = {
            "rot": 30, "gruen": 35
        }

    }
    else if (drain === "Hoch") {
        preset = {
            "rot": 40, "gruen": 45
        }
    } return preset

}
const Navbar = () => {

    let preset = "";
    //getting the State for the drain from the Routing component
    const { drain } = useContext(drainContext);
    //useState Hook for the Latest Datarow from the database

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



    //useEffect Hook to run the functions on Component Load

    useEffect(() => {
        getLatest();

    }, []);
    //check preset function to gain the limits for the user setting
    preset = checkPreset(drain)


    //Returning The Infobar, parts of the bar got styled with Tailwind CSS for simplicity

    return (
        <div>
            <nav className="navbar ml-6 text-center ">

                {/* Desktop div to show an info for the user, wether the plant needs water or not, Color is conditional on the Sensor Data*/}
                <div className={`hidden md:block ${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-400" : ""}`}>{`${latest.feuchte < preset["rot"] ? "Die Erde ist zu trocken, Bitte jetzt gießen!" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset["rot"] ? "Die Pflanze muss bald gegossen werden" : ""}${latest.feuchte > preset["gruen"] ? "Die Pflanze hat genügend Wasser" : ""}`}
                </div>
                {/* Mobile div to show an info for the user, wether the plant needs water or not, Text is shortend for Mobile, Color is conditional on the Sensor Data*/}
                <div className={` block text-xl md:hidden ${latest.feuchte < preset["rot"] ? "text-red-600" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset?.rot ? "text-yellow-400" : ""}${latest.feuchte > preset["gruen"] ? "text-green-400" : ""}`}>{`${latest.feuchte < preset["rot"] ? "Bitte jetzt gießen!" : ""}${latest.feuchte <= preset["gruen"] && latest.feuchte >= preset["rot"] ? "Die Pflanze muss bald gegossen werden" : ""}${latest.feuchte > preset["gruen"] ? "Die Pflanze hat genügend Wasser" : ""}`}
                </div>
            </nav>
        </div>
    );
};
export default Navbar;