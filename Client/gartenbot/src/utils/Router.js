import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sensor from '../Components/Sensor';
import Navbar from "../Components/Navbar/Navbar";
import Settings from "../Components/settings/Settings";
import Status from "../Components/Status"
export default function Routing() {
  return (
    <Router>
     <Navbar/>
      <Routes>

     
        <Route path="/" exact element={ <Sensor />} />
        <Route path="/settings" exact element={  <Status/> }></Route>
      </Routes>
    </Router>
  );
}
