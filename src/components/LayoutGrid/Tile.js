import React from "react";
import { useAppContext } from "../../utils/AppContext";

// This component generates a grid tile 
export default function Tile(props) {
    const [state, _] = useAppContext();

    const currPos = `X${props.tileId}Y${props.rowId}`;
    const clickCount = state.positionsClicked[currPos] || 0;

    let tileClassName = "grid-tile";

    if (clickCount > 0)
        tileClassName = " clicked-tile";

    if (props.tileId === state.dronePosition.x
        && props.rowId === state.dronePosition.y) {
        tileClassName += " drone-tile";
        if (state.newPositionClicked)
            tileClassName += " highlight-tile";
    }

    return (
        <div key={`Y${props.rowId}X${props.tileId}`}
            className={tileClassName}>
            {clickCount ? clickCount : ""}
        </ div>)
}
