import React = require("react");
import { FaTrash } from "react-icons/fa";
import { IRemoveCurrentAnnotationProps } from "../../interfaces/custom/IRemoveCurrentAnnotationProps";

export class RemoveCurrentAnnotation extends React.Component<{handlerRemove():void},{}> {

    render() {
        return (
            <div onClick={()=>{this.props.handlerRemove()}} >
                <FaTrash className="RemoveCurrentAnnotation-iconMessage"></FaTrash>
            </div>
        )
    }
}