import React, { useEffect } from "react";
import LayoutGrid from '../components/LayoutGrid';

// This page displays the application homepage layout grid and the drone
export default function Homepage(props) {

    // Enable user input on load of this page
    useEffect(() => {
        props.enableUserInput(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="scroll-wrapper">
            <LayoutGrid />
        </div>
    );
}
