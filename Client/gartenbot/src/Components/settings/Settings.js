import React, { useEffect, useState } from 'react';
import axios from "axios";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import "./Settings.css"
const Settings = () => {
  const [user, setUser] = useState([])
  const [selectedDrain, setSelectedDrain] = useState()
  const getUser = () => {
    axios.get("http://localhost:2000/api/user")
      .then(res =>{ setUser(res.data)});
     
  }
  useEffect(() => {


    getUser();


  }, []);


  const handleOnChange = (e) => {


    axios.put('http://localhost:2000/api/user/' + 1, { "drain": e.target.value })
      .then(response => {
        console.log("Status: ", response.status);
        console.log("Data: ", response.data);
        
      }).catch(error => {
        console.error('Something went wrong!', error);
      });
      getUser();
  }
  return (
    <>


    
      <div className="wrapper">
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
                <InputLabel id="verbrauch">Verbrauch</InputLabel>
                <Select
                  labelId="verbrauch"
                  id="verbrauch"
                  value={user?.drain}
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