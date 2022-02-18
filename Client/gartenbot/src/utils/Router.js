import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sensor from '../Components/Sensor';
import Bar from "../Components/bar";
import Navbar from "../Components/Navbar/Navbar";
import Settings from "../Components/settings/Settings";
import drainContext from "./drainContext";
import axios from "axios";
//charts weg machen wenn bestimmte breite und nur werte machen
export default function Routing() {
  const [drain, setDrain] = useState(null);
  const value = useMemo(() => ({ drain, setDrain }), [drain, setDrain]);
  if (drain === null) {
    axios.get("http://192.168.91.248:2000/api/user")
      .then(res => { setDrain(res.data.drain) })
  }

  /* , "verbrauch": { "Niedrig": { "Niedrig": "<15", "Mittel": ">15&&<20", "Hoch": ">20" }, "Mittel": { "Niedrig": "<30", "Mittel": ">30&&<35", "Hoch": ">35" },"Niedrig":{"Niedrig":"<40","Mittel":">40&&<45","Hoch":">45" }} */
  return (
    <Router>
      <drainContext.Provider value={value}>
        <div className="container flex flex-wrap">
          <Navbar />
          <Bar />
          <Sensor />
          <Routes>

            <Route path="/settings" exact element={<Settings />} />
            <Route path="/bar" exact element={<Bar />} />
          </Routes>
        </div>
      </drainContext.Provider>
    </Router>
  );
}
