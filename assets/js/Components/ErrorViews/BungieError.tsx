import React from "react"

import './style.css'

interface ErrorInterface {
    errorStatus: string,
    message: string
}

export default function BungieError(props: ErrorInterface) {

    const message = props.errorStatus ? "Bungie Systems are down, please try again later." : props.message

    return(
        <div className="error-wrapper">
            <h1 className="error-title">{props.errorStatus}</h1>
            <div className="error-message">{message}</div>
        </div>
    )
}