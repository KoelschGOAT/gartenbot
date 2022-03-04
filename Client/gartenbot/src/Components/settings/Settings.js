import React, { useContext} from 'react';
import axios from "axios";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import "./Settings.css";
import drainContext from "../../utils/drainContext";



const Settings = () => {
  //Getting the drain Context from the Routing Component 
  const {drain,setDrain}= useContext(drainContext);
  //Title 
  window.document.title ="Einstellungen";
  //Function to handle the Change from the menu and setting the new user Setting in the Database, using axios peckage to put the request 
  const handleOnChange = (e) => {
    axios.put('http://192.168.93.73:2000/api/user/' + 1, { "drain": e.target.value })
     .then(response => {
     }).catch(error => {
       console.error('Something went wrong!', error);
     });
     //Setting the new Drain globaly with the Context for other components the change the state without reloading the page
     setDrain(e.target.value);
     

 }
 //Returning the Settings Page
  return (
    <>


    
      <div className="wrapperr">
        <div className="device-content">
          <div className="header">
            <p>
              <span>Pflanzen Einstellung </span>

            </p>
          </div>
          <form className="body">
            <div className="p-5 ">Aktueller Verbrauch:</div>
            <div className="input-wrapper">
              {/* Material UI Select Input */}
              <FormControl fullWidth>
                <InputLabel id="verbrauch"></InputLabel>
                <Select
                  labelId="verbrauch"
                  id="verbrauch"
                  value={drain}
                  label="Verbrauch"
                  onChange={handleOnChange}
                >
                  <MenuItem value={"Niedrig"}>Niedrig</MenuItem>
                  <MenuItem value={"Mittel"}>Mittel</MenuItem>
                  <MenuItem value={"Hoch"}>Hoch</MenuItem>
                </Select>
              </FormControl>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Settings