import React = require("react");
import {FaInfo } from "react-icons/fa";

export class InfoMessage extends React.Component<{ message: string }, {}> {

    render() {
        const { message } = this.props;
        return (
            <div>
                <span className="InfoMessage-iconMessage"><FaInfo></FaInfo></span>
                <span>{message}</span>
            </div>
        )
    }
}