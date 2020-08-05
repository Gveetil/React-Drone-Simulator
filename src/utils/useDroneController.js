import { useEffect, useState } from 'react';
import { AppContextAction, useAppContext } from "./AppContext";

let allowKeyEvents = false;
let previousKeyEventsSetting = false;

// This custom hook listens for keyboard events and if it is a 
// valid drone command, performs the action
export default function useDroneController() {
    /* eslint-disable no-unused-vars */
    const [state, dispatch] = useAppContext();
    const [isExecuting, setIsExecuting] = useState();

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
        event.preventDefault();
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
                break;
        }
    }

    // Function enables / disables processing of user keydown events
    function enableUserInput(value) {
        // Disable user input when drone simulation is executing
        if (isExecuting) {
            previousKeyEventsSetting = value;
            return;
        }

        allowKeyEvents = value;
    }

    function stopSimulation() {
        allowKeyEvents = previousKeyEventsSetting;
        setIsExecuting(false);
    }

    function startSimulation(speed, droneInput) {
        previousKeyEventsSetting = allowKeyEvents;
        allowKeyEvents = false;
        setIsExecuting(true);
    }

    return {
        enableUserInput,
        startSimulation,
        stopSimulation,
        isExecuting,
    };
}