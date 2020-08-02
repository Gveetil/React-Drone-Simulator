import React, { useState } from "react";
import { useAppContext } from "../utils/AppContext";

// This component generates a grid tile 
export default function Tile(props) {
    const [state, _] = useAppContext();
    const [content, setContent] = useState("");

    // Stub - To Do .. add clicks to grid
    const handleClick = (xPos, yPos) => {
        setContent(`X${xPos}Y${yPos}`);
    };

    return (
        <div key={`Y${props.rowId}X${props.tileId}`}
            className={(props.tileId === state.dronePosition.x &&
                props.rowId === state.dronePosition.y) ?
                "grid-tile drone-tile"
                : "grid-tile"}
            onClick={() => handleClick(props.tileId, props.rowId)}
        >
            {content}


        </div>)
}
