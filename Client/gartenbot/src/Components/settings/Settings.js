import React, { useEffect, useState ,useContext} from 'react';
import axios from "axios";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import "./Settings.css";
import drainContext from "../../utils/drainContext";



const Settings = () => {
  const {drain,setDrain}= useContext(drainContext);
  
  


  const handleOnChange = (e) => {


     axios.put('http://192.168.93.73:2000/api/user/' + 1, { "drain": e.target.value })
      .then(response => {
        
        
      }).catch(error => {
        console.error('Something went wrong!', error);
      });/*
      getUser(); */
      setDrain(e.target.value);
      

  }
  return (
    <>


    
      <div className="wrapperr">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <div className="device-content">
          <div className="header">
            <p>
              <span>Pflanzen Einstellung </span>

            </p>
          </div>
          <form className="body">
            <div className="p-5 ">Aktueller Verbrauch:</div>
            <div className="input-wrapper">
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