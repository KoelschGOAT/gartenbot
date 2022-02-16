import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sensor from '../Components/Sensor';
import Bar from "../Components/bar";
import Navbar from "../Components/Navbar/Navbar";
import Settings from "../Components/settings/Settings";
export default function Routing() {
  return (
    <Router>
     <Navbar/>
     <Bar />
      <Routes>

     
        <Route path="/" exact element={ <Sensor />} />
        <Route path="/settings" exact element={ <Settings />} />
        <Route path="/bar" exact element={<Bar /> } />

      </Routes>
    </Router>
  );
}
