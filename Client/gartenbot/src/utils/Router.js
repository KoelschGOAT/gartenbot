import * as React from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Sensor from '../Components/Sensor';
import Chart from "../Components/chart";
export default function Routing() {
  return (
    <Router>
      <Routes>
        {" "}
        <Route path="/" exact element={<Sensor />} />
        <Route path="/chart"  element={<Chart />} />
      </Routes>
    </Router>
  );
}
