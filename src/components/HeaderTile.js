import React from "react";

// This component generates a grid header tile 
export default function HeaderTile(props) {
    return (
        <div key={`${props.headerId}`}
            className="header-tile">
            {props.headerName}
        </div>)
}
