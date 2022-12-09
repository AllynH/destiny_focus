import React from "react"

import './style.css'

interface SmallMessageInterface {
    message: string,
    url?: string,
    comment?: string
}

export default function SmallMessage(props: SmallMessageInterface) {

    return (
        <div className="small-message-wrapper">
            <p className="small-message-content small-message-text">{props.message}</p>
            {props.url && <a className="small-message-text" target="_blank" rel="noopener noreferrer" href={props.url}>{props.comment}</a> }
        </div>
    )

}