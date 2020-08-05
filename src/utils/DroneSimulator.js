import { AppContextAction } from "./AppContext";

/** The available duration between drone actions in milliseconds
 *  this is selected based on speed setting used */
const droneSpeed = [350, 200, 50];

/** The milliseconds to wait before starting the simulation - important to ensure page loads first */
const waitingTime = 700;

/** This module executes the drone simulation */
const DroneSimulator = {
    // Initialize Drone Simulation
    start(speed, droneInput, dispatch, completed) {
        // Clear state
        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
        this.speed = droneSpeed[speed - 1];
        this.droneInput = droneInput.split("");
        this.dispatch = dispatch;
        this.completed = completed;
        this.timeoutInterval = setTimeout(() => this.startSimulation(), waitingTime);
    },
    // Stop Drone Simulation
    stop() {
        if (this.timeoutInterval)
            clearTimeout(this.timeoutInterval);

        this.timeoutInterval = null;
    },
    // Schedule Drone Simulation actions
    startSimulation() {
        this.timeoutInterval = setInterval(() => this.executeNextAction(), this.speed);
    },
    // Executes the next action from the input list
    executeNextAction() {
        // If the instructions have completed, stop execution
        // and execute completed callback function
        if (this.droneInput.length <= 0) {
            this.stop();
            this.completed();
            return;
        }
        let action = this.droneInput.shift();
        this.dispatchAction(action);
    },
    // Dispatches a given action by calling the dispatch callback function 
    dispatchAction(action) {
        if (action === "x") {
            this.dispatch({
                type: AppContextAction.CLICK_POSITION,
            });
        } else {
            this.dispatch({
                type: AppContextAction.MOVE_DRONE,
                move: action,
            });
        }
    },
}

export default DroneSimulator;