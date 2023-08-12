import React from "react";
import Home from './components/routes/Home'
import RandomMovie from "./components/routes/RandomMovie";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/random-movie" element = {<RandomMovie />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;