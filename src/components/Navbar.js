import React from "react";
import copy from 'copy-to-clipboard';
import { useAppContext } from "../utils/AppContext";

// This component renders the top navigation bar
export default function Navbar() {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();

    // Copy drone instructions to clipboard 
    const handleCopyToClipboard = (event) => {
        const instructionsText = event.target.closest(".input-group").firstChild.nextSibling;
        if (instructionsText)
            copy(instructionsText.value);
    }

    return (
        <nav className="navbar fixed-top navbar-dark bg-primary" >
            <a className="navbar-brand" href="/">Drone Simulator</a>
            <form className="form-inline ml-auto">
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
                            id="copy-instructions">
                            <i className="fa fa-clipboard" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-sm ml-2 my-2 my-md-0">
                    Targets&nbsp;&nbsp;<span className="badge badge-light">{Object.keys(state.positionsClicked).length}</span>
                </button>
                <button type="button" className="btn btn-primary btn-sm my-2 my-md-0">
                    Total Clicks&nbsp;&nbsp;<span className="badge badge-light">{state.totalClicked}</span>
                </button>
                <button className="btn btn-secondary btn-sm ml-2 my-2 my-md-0" type="button">Run Simulator</button>
            </form>
        </nav>
    );
}
