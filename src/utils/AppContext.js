import React, { useReducer, useContext } from "react";

// Enum of Action keys supported by this context  
const AppContextAction = {
    MOVE_DRONE: "MOVE_DRONE",       // Move the drone to a new position
}

const AppContext = React.createContext();
const { Provider } = AppContext;
const defaultState = {
    rangeX: [-10, 10],
    rangeY: [-10, 10],
    dronePosition: { x: 0, y: 0 },
    positionsClicked: [],
};

// Reducer to make changes to the application context state
const reducer = (state, action) => {
    switch (action.type) {
        case AppContextAction.MOVE_DRONE: {
            let x = state.dronePosition.x;
            let y = state.dronePosition.y;
            switch (action.move) {
                case "<":
                    x -= 1;
                    break;
                case ">":
                    x += 1;
                    break;
                case "^":
                    y -= 1;
                    break;
                case "v":
                    y += 1;
                    break;
                default:
                    break;
            }
            let rangeX = state.rangeX;
            let rangeY = state.rangeY;
            if (x < state.rangeX[0]) {
                rangeX[0] = x;
            } else if (x > state.rangeX[1]) {
                rangeX[1] = x;
            }
            if (y < state.rangeY[0]) {
                rangeY[0] = y;
            } else if (y > state.rangeY[1]) {
                rangeY[1] = y;
            }
            return {
                ...state,
                rangeX,
                rangeY,
                dronePosition: { x, y },
            };
        }
        default:
            return state;
    }
};

// Returns the Provider to be used when using the application context 
const AppProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return <Provider value={[state, dispatch]} {...props} />;
};

// Returns the application context 
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContextAction };
