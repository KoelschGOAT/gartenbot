import * as React from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Sensor from '../Components/Sensor';

export default function Routing() {
  return (
    <Router>
      <Routes>
        {" "}
        <Route path="/" exact element={<Sensor />} />
      </Routes>
    </Router>
  );
}
