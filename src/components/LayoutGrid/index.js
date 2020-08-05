import React, { useEffect } from "react";
import GridRow from "./GridRow";
import HeaderTile from "./HeaderTile";
import { useAppContext } from "../../utils/AppContext";
import "./style.css";

// This component generates the layout grid for the drone to move on
export default function LayoutGrid() {
    /* eslint-disable no-unused-vars */
    const [state, _] = useAppContext();

    // on update, scroll the drone into view 
    useEffect(() => {
        const droneTile = document.querySelector(".drone-tile");
        if (droneTile) {
            droneTile.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    // Generate the x axis header row
    function renderHeaderRow([colStart, colEnd]) {
        const headerRow = [];
        for (let i = colStart; i <= colEnd; i++) {
            headerRow.push(<HeaderTile key={`X${i}`} headerId={`X${i}`} headerName={i} />);
        }
        return headerRow;
    }

    // Generate rows to be displayed on the y-axis
    function renderRows([rowStart, rowEnd]) {
        const rows = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            const rowId = `Y${i}`;
            rows.push(<GridRow key={rowId} rowId={rowId} yPos={i} />);
        }
        return rows;
    }

    return (
        <div className="d-flex flex-column flex-nowrap overflow-auto p-2 my-3 mx-auto">
            {renderRows(state.rangeY)}
            <div className="d-flex flex-row flex-nowrap justify-content-center">
                <HeaderTile headerId={`XY`} headerName="" />
                {renderHeaderRow(state.rangeX)}
            </div>
        </div>
    );
}
