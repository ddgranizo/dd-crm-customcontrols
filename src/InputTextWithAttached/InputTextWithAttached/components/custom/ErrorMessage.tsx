import React = require("react");
import { FaTimesCircle } from "react-icons/fa";

export class ErrorMessage extends React.Component<{ message: string }, {}> {

    render() {
        const { message } = this.props;
        return (
            <div>
                <span className="ErrorMessage-iconMessage"><FaTimesCircle></FaTimesCircle></span>
                <span>{message}</span>
            </div>
        )
    }
}