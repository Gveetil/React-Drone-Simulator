import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// This page displays information about the application and drone behaviors
export default function Information(props) {

    // Disable user input on load of this page
    useEffect(() => {
        props.enableUserInput(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="scroll-wrapper">
            <div className="p-2 my-3 mx-auto">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h3>Information</h3>
                            <hr />
                            <p>
                                This application aims to simulate an aerial drone that takes photographs of targets.<br />
                                Instructions are sent to the drone that tell the drone which direction to move <mark>north (^)</mark>, <mark>south (v)</mark>, <mark>east (&gt;)</mark> or <mark>west (&lt;)</mark> and when to take a <mark>photo (x)</mark>.
                            </p>
                            <p className="lead font-weight-normal">
                                Generating Drone Instructions
                            </p>
                            <ul>
                                <li>The drone can be moved using the keyboard arrow keys</li>
                                <li>Press the space bar to click a photo - the grid shows the number of photos clicked at a given location; totals are displayed at the top.</li>
                                <li>The grid expands with drone movement.</li>
                                <li>Instructions for the drone can be copied using the copy button.</li>
                                <li>To clear the grid use the reset button on top.</li>
                            </ul>
                            <hr />
                            <p className="lead font-weight-normal">
                                Running the Drone Simulator
                            </p>
                            <ul>
                                <li>Click <mark>Run Simulator</mark> to open the simulator page.</li>
                                <li>Paste drone instructions generated into the text field and click <mark>Simulate</mark>.</li>
                                <li>To stop the simulation mid-way, click the <mark>Stop Execution</mark> button on top.</li>
                                <li>For a sample long running simulation - click on <mark>Load Sample</mark> in the simulator page. This will run for about 9 minutes in the <mark>Fast</mark>mode.</li>
                                <li>To skip to the simulation end result, click on <mark>Show Result</mark>.</li>
                            </ul>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <Link to="/" className="btn btn-secondary" >Close</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
