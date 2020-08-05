import React from 'react';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import SimulateDrone from './pages/SimulateDrone';
import Homepage from './pages/Homepage';
import Information from './pages/Information';
import useDroneController from "./utils/useDroneController";

function App() {
  const droneController = useDroneController();
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Navbar
        isExecuting={droneController.isExecuting}
        stopSimulation={droneController.stopSimulation} />
      <Switch>
        <Route exact path="/simulate">
          {droneController.isExecuting ?
            <Redirect to="/" />
            :
            <SimulateDrone
              enableUserInput={droneController.enableUserInput}
              startSimulation={droneController.startSimulation} />}
        </Route>
        <Route exact path="/information">
          {droneController.isExecuting ?
            <Redirect to="/" />
            :
            <Information
              enableUserInput={droneController.enableUserInput} />}
        </Route>
        <Route path="/">
          <Homepage enableUserInput={droneController.enableUserInput} />
        </Route>
      </Switch>
    </HashRouter >
  );
}

export default App;
