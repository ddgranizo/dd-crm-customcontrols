import React from 'react'
import 'bulma/css/bulma.css'



export class ParameterDetail extends React.Component {

    render() {
        const {displayName, name, description, type, required, bound} = this.props.parameter
        
        return (<nav className="panel ControlDetail-AtributeItem">
            <p className="panel-heading">{displayName}</p>
            <div className="panel-block"><span><b>Display name: </b>{displayName}</span></div>
            <div className="panel-block"><span><b>Name: </b>{name}</span></div>
            <div className="panel-block"><span><b>Description: </b>{description}</span></div>
            <div className="panel-block"><span><b>Type: </b>{type}</span></div>
            <div className="panel-block"><span><b>Required: </b>{required ? "Yes" : "No"}</span></div>
            <div className="panel-block"><span><b>Bound: </b>{bound ? "Yes" : "No"}</span></div>
        </nav>)
    }
}
