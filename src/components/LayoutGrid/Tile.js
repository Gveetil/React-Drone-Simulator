import React from "react";

// This component generates a grid tile 
export default function Tile(props) {

    let tileClassName = (props.clickCount) ? "clicked-tile" : "grid-tile";

    if (props.showDrone)
        tileClassName += " drone-tile";

    if (props.showHighlight)
        tileClassName += " highlight-tile";

    return (
        <div key={props.tileId}
            className={tileClassName}>
            {props.clickCount ? props.clickCount : ""}
        </ div>)
}
