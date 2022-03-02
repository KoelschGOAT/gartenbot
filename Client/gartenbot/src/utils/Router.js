import React, { useState, useMemo, useEffect } from "react";
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
  useEffect(() => {
    if (drain === null) {
      axios.get("http://192.168.93.73:2000/api/user")
        .then(res => {setDrain(res.data.drain)});
    }



  }, [])

  return (
    <Router>
      <drainContext.Provider value={ value }>
        <div className="container flex ">
          <Navbar />
          <Bar />
          <Routes>
            <Route path="/" exact element={<Sensor />} />
            <Route path="/settings" exact element={<Settings />} />
          </Routes>
        </div>
      </drainContext.Provider>
    </Router>
  );
}
