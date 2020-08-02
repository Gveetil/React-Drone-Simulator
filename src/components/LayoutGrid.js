import React, { useEffect } from "react";
import GridRow from "./GridRow";
import HeaderTile from "./HeaderTile";
import { AppContextAction, useAppContext } from "../utils/AppContext";
import "./style.css";

// This component generates the layout grid for the drone to move on
export default function LayoutGrid() {
    const [state, dispatch] = useAppContext();

    // Add key down listener on load of component
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function handles the key down event 
    function handleKeyDown(event) {
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
            default:
                break;
        }
    }

    // Generate the x axis header row
    function renderHeaderRow([colStart, colEnd]) {
        const headerRow = [];
        for (let i = colStart; i <= colEnd; i++) {
            headerRow.push(<HeaderTile headerId={`X${i}`} headerName={i} />);
        }
        return headerRow;
    }

    // Generate rows to be displayed on the y-axis
    function renderRows([rowStart, rowEnd]) {
        const rows = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            rows.push(<GridRow rowId={i} />);
        }
        return rows;
    }

    return (
        <div className="scroll-wrapper">
            <div className="d-flex flex-column flex-nowrap overflow-auto p-4 m-3 mx-auto">
                {renderRows(state.rangeY)}
                <div className="d-flex flex-row flex-nowrap justify-content-center">
                    <HeaderTile headerId={`XY`} headerName="" />
                    {renderHeaderRow(state.rangeX)}
                </div>
            </div>
        </div>
    );
}
