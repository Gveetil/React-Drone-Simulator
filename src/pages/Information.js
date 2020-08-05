import React, { useEffect } from "react";

// This page displays information about the application and drone behaviors
export default function Information(props) {

    // Disable user input on load of this page
    useEffect(() => {
        props.enableUserInput(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="scroll-wrapper">
            <div className="p-2 my-3 mx-auto">
                add information here ...
            </div>
        </div>
    );
}
