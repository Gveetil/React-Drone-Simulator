import React from "react";
import { AppContextAction, useAppContext } from "../utils/AppContext";

// This component renders a Success Toast Message
// This is a quick custom built toast since Bootstrap's Toast component 
// has dependencies on JQuery and other js files
export default function SuccessToast() {
    /* eslint-disable no-unused-vars */
    const [state, dispatch] = useAppContext();

    // Close the toast message
    function handleClose() {
        dispatch({
            type: AppContextAction.SHOW_SUCCESS_TOAST,
            value: false,
        });
    }

    return (
        <div className="shadow position-fixed bg-success rounded fixed-bottom w-25 m-4 p-2">
            <div className="toast fade show">
                <div className="toast-header">
                    <strong className="mr-auto"><i className="fa fa-check" aria-hidden="true"></i> {state.successToast}</strong>
                    <button type="button" className="ml-2 mb-1 close"
                        onClick={handleClose}
                        data-dismiss="toast">&times;</button>
                </div>
            </div>
        </div>
    );
}