import React from "react";
import copy from 'copy-to-clipboard';
import { Link } from "react-router-dom";
import { AppContextAction, useAppContext } from "../utils/AppContext";

// This component renders the top navigation bar
export default function Navbar(props) {
    /* eslint-disable no-unused-vars */
    const [state, dispatch] = useAppContext();

    // Copy drone instructions to clipboard 
    const handleCopyToClipboard = (event) => {
        const instructionsText = event.target.closest(".input-group").firstChild.nextSibling;
        if (instructionsText)
            copy(instructionsText.value);
    }

    const handleReset = (event) => {
        dispatch({
            type: AppContextAction.RESET_DRONE_LAYOUT,
        });
    }

    return (
        <nav className="navbar fixed-top navbar-dark bg-primary" >
            <Link to="/" className="navbar-brand">
                <i className="fa fa-crosshairs pr-3" aria-hidden="true"></i>
                Drone Simulator</Link>
            <form className="form-inline ml-auto">
                {(!props.isExecuting) && <Link to="/information" className="btn btn-primary btn-sm my-2 my-md-0"
                    title="Information"
                    role="button">
                    <i className="fa fa-info-circle fa-lg" aria-hidden="true"></i>
                </Link>}
                <button type="button"
                    title="Total targets photographed"
                    className="btn btn-primary btn-sm my-2 my-md-0 disable-cursor">
                    Targets&nbsp;&nbsp;<span className="badge badge-light">{Object.keys(state.positionsClicked).length}</span>
                </button>
                <button type="button"
                    title="Total photographs taken"
                    className="btn btn-primary btn-sm my-2 my-md-0 disable-cursor">
                    Total Clicks&nbsp;&nbsp;<span className="badge badge-light">{state.totalClicked}</span>
                </button>
                <div className="input-group my-2 my-md-0">
                    <label className="text-white pr-2 form-control-sm" htmlFor="drone-instructions">Drone Input</label>
                    <input type="text" className="form-control form-control-sm"
                        readOnly id="drone-instructions"
                        placeholder=""
                        value={state.droneInstructions}
                        aria-label="Drone Instructions"
                        aria-describedby="copy-instructions" />
                    <div className="input-group-append">
                        <button className="btn btn-secondary btn-sm"
                            type="button"
                            onClick={handleCopyToClipboard}
                            title="Copy"
                            id="copy-instructions">
                            <i className="fa fa-clipboard" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                {(!props.isExecuting) &&
                    <button type="button"
                        className="btn btn-secondary btn-sm ml-2 my-2 my-md-0"
                        onClick={handleReset}
                        onKeyUp={(e) => {
                            // Prevent space bar from triggering the reset button
                            if (e.keyCode === 32)
                                e.preventDefault()
                        }}
                        title="Reset">
                        <i className="fa fa-undo" aria-hidden="true"></i>
                    </button>}
                {(props.isExecuting) &&
                    <button className="btn btn-secondary btn-sm ml-2 my-2 my-md-0"
                        onClick={() => props.stopSimulation()}
                        type="button">Stop Execution</button>}
                {(!props.isExecuting) &&
                    <Link to="/simulate" className="btn btn-secondary btn-sm ml-2 my-2 my-md-0"
                        role="button">Run Simulator</Link>}

            </form>
        </nav>
    );
}
