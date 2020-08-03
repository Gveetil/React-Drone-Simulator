import React from "react";
import HeaderTile from "./HeaderTile";
import Tile from "./Tile";
import { useAppContext } from "../../utils/AppContext";

// This component generates a grid data row
export default function GridRow(props) {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();

    // This function renders tiles for this row
    function renderTiles([rangeStart, rangeEnd], rowId) {
        const tiles = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            tiles.push(<Tile key={`X${i}Y${rowId}`} rowId={rowId} tileId={i} />);
        }
        return tiles;
    }

    return (
        <div className="d-flex flex-row flex-nowrap justify-content-center">
            <HeaderTile key={`Y${props.rowId}`} headerId={`Y${props.rowId}`} headerName={props.rowId} />
            {renderTiles(state.rangeX, props.rowId)}
        </div>
    );
}