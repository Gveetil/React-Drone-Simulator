import React from 'react';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { useAppContext } from "./utils/AppContext";
import Navbar from './components/Navbar';
import SuccessToast from './components/SuccessToast';
import SimulateDrone from './pages/SimulateDrone';
import Homepage from './pages/Homepage';
import Information from './pages/Information';
import useDroneController from "./utils/useDroneController";

function App() {
  /* eslint-disable no-unused-vars */
  const [state, _] = useAppContext();
  const droneController = useDroneController();
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Navbar
        isExecuting={droneController.isExecuting}
        stopSimulation={droneController.stopSimulation} />
      <div className="page-navbar-offset">
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
      </div>
      {state.successToast && <SuccessToast />}
    </HashRouter >
  );
}

export default App;
