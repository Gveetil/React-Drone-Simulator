import React from "react";
import HeaderTile from "./HeaderTile";
import Tile from "./Tile";
import { useAppContext } from "../../utils/AppContext";

// This component generates a grid data row
export default function GridRow(props) {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();

    // This function renders tiles for this row
    function renderTiles([rangeStart, rangeEnd], rowId, yPos) {
        const tiles = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            const currPos = `X${i}${rowId}`;
            const clickCount = state.positionsClicked[currPos] || 0;
            const showDrone = (yPos === state.dronePosition.y && i === state.dronePosition.x);
            tiles.push(<Tile key={currPos} tileId={currPos}
                showHighlight={showDrone && state.newPositionClicked}
                showDrone={showDrone} clickCount={clickCount} />);
        }
        return tiles;
    }

    return (
        <div className="d-flex flex-row flex-nowrap justify-content-center">
            <HeaderTile key={props.rowId} headerId={props.rowId} headerName={props.yPos} />
            {renderTiles(state.rangeX, props.rowId, props.yPos)}
        </div>
    );
}