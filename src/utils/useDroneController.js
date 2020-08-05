import { useEffect, useState } from 'react';
import { AppContextAction, useAppContext } from "./AppContext";
import DroneSimulator from "./DroneSimulator";

// Flag - allow key down events to be processed
let allowKeyEvents = false;
let currentKeyEventsConfig = false;

// This custom hook listens for keyboard events and if it is a 
// valid drone command, performs the action
export default function useDroneController() {
    /* eslint-disable no-unused-vars */
    const [_, dispatch] = useAppContext();
    const [isExecuting, setIsExecuting] = useState(false);

    // Add key down listener on load of component
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function handles the key down event 
    function handleKeyDown(event) {
        // Check if keyboard events are enabled for this page
        if (!allowKeyEvents)
            return;
        switch (event.key) {
            case "ArrowLeft":
                dispatch({
                    type: AppContextAction.MOVE_DRONE,
                    move: "<",
                });
                break;
            case "ArrowRight":
                dispatch({
                    type: AppContextAction.MOVE_DRONE,
                    move: ">",
                });
                break;
            case "ArrowUp":
                dispatch({
                    type: AppContextAction.MOVE_DRONE,
                    move: "^",
                });
                break;
            case "ArrowDown":
                dispatch({
                    type: AppContextAction.MOVE_DRONE,
                    move: "v",
                });
                break;
            case " ":
                dispatch({
                    type: AppContextAction.CLICK_POSITION,
                });
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    // Function enables / disables processing of user keydown events
    function enableUserInput(value) {
        // Disable user input when drone simulation is executing
        if (isExecuting) {
            currentKeyEventsConfig = value;
            return;
        }

        allowKeyEvents = value;
    }

    // Stops the Drone Simulation
    function stopSimulation() {
        DroneSimulator.stop();
        allowKeyEvents = currentKeyEventsConfig;
        setIsExecuting(false);
    }

    // Starts the Drone Simulation
    function startSimulation(speed, droneInput) {
        currentKeyEventsConfig = allowKeyEvents;
        allowKeyEvents = false;
        setIsExecuting(true);
        dispatch({
            type: AppContextAction.RESET_DRONE_LAYOUT,
        });
        DroneSimulator.start(speed, droneInput, dispatch, simulationCompleted);
    }

    // Callback function gets called when simulation is completed
    function simulationCompleted() {
        stopSimulation();
        dispatch({
            type: AppContextAction.SHOW_SUCCESS_TOAST,
            value: "Simulation completed successfully!",
        });
    }

    return {
        enableUserInput,
        startSimulation,
        stopSimulation,
        isExecuting,
    };
}