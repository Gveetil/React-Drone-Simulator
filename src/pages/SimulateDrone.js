import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContextAction, useAppContext } from "../utils/AppContext";
import DroneSimulator from "../utils/DroneSimulator";
import sampleDroneInput from "../data/droneInput.json";

// Values allowed in drone input field
/* eslint-disable-next-line no-useless-escape */
const allowedInputValues = new RegExp(/^[x<>v\^]*$/g);

// The Speed Levels supported
const speedDisplay = ["Slow", "Medium", "Fast"];

// This component renders the simulate drone page
export default function SimulateDrone(props) {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();
    const defaultState = {
        speed: 2,
        instructions: "",
        error: false
    };
    const [formState, setFormState] = useState(defaultState);

    // Start drone simulation
    const handleExecute = (event) => {
        // Ensure intructions are specified
        if (!formState.instructions) {
            event.preventDefault();
            setFormState({ ...formState, error: "Please enter instructions for the drone to execute!" });
            return;
        }
        props.startSimulation(formState.speed, formState.instructions);
    }

    // Show result of simulation
    function handleShowResult(event) {
        // Ensure intructions are specified
        if (!formState.instructions) {
            event.preventDefault();
            setFormState({ ...formState, error: "Please enter instructions for the drone to execute!" });
            return;
        }
        dispatch({
            type: AppContextAction.RESET_DRONE_LAYOUT,
        });
        DroneSimulator.executeAllActions(formState.instructions, dispatch);
    }

    // load sample drone input 
    function loadSampleInput() {
        if (sampleDroneInput && sampleDroneInput.data) {
            const sampleData = sampleDroneInput.data.toLowerCase();
            // Ensure data in in the right format
            if (sampleData.match(allowedInputValues)) {
                setFormState({ ...formState, instructions: sampleData });
                return;
            }
        }
        setFormState({ ...formState, error: "Unable to load sample data!" });
    }

    // Disable user input on load of this page
    useEffect(() => {
        props.enableUserInput(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Validate and update form data on change
    function handleInputChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        if (name === "instructions") {
            value = value.toLowerCase();
            if (!value.match(allowedInputValues))
                return;
        }
        if (formState.error) {
            // Clear errors if any
            setFormState({
                ...formState,
                error: false,
                [name]: value
            });
            return;
        }
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // Clear form data
    function handleFormClear() {
        setFormState(defaultState);
    }

    return (
        <div className="modal-dialog modal-lg pt-3" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="simulateModalLabel">Drone Simulator</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <label htmlFor="drone-speed" className="col-form-label">
                            Speed: {speedDisplay[formState.speed - 1]}
                        </label>
                        <div>
                            <input type="range" className="w-25"
                                id="drone-speed"
                                name="speed"
                                onChange={handleInputChange}
                                min="1" max="3"
                                value={formState.speed}></input>
                        </div>
                        <div className="form-group clearfix mb-0">
                            <div className="py-1">
                                <label htmlFor="drone-instructions" className="col-form-label">Enter Instructions for the Drone to execute:</label>
                                <div className="float-sm-right">
                                    <label className="col-form-label pr-2" htmlFor="load-instructions">Load sample</label>
                                    <button className="btn btn-primary btn-sm"
                                        type="button"
                                        onClick={loadSampleInput}
                                        id="load-instructions">
                                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <textarea className="form-control"
                                spellCheck="false"
                                name="instructions" rows="5"
                                onChange={handleInputChange}
                                id="drone-instructions"
                                aria-describedby="instructionHelp"
                                value={formState.instructions}>
                            </textarea>
                            <small id="instructionHelp" className="form-text text-muted">
                                Allowed Input Values: &lt; &gt; ^ v and x
                            </small>
                        </div>
                        {formState.error && <div className="alert alert-warning mt-2 mb-0" role="alert">
                            {formState.error}
                        </div>}
                    </form>
                </div>
                <div className="modal-footer flex-wrap">
                    <Link to="/" className="btn btn-secondary my-1 my-sm-0" >Close</Link>
                    <button type="button"
                        onClick={handleFormClear}
                        className="btn btn-secondary my-1 my-sm-0">Clear</button>
                    <Link to="/" role="button"
                        onClick={handleShowResult}
                        className="btn btn-primary my-1 my-sm-0" >Show Result</Link>
                    <Link to="/" role="button"
                        onClick={handleExecute}
                        className="btn btn-primary my-1 my-sm-0" >Simulate</Link>
                </div>
            </div>
        </div>);
}