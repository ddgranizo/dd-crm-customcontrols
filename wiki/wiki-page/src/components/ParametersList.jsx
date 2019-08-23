import React from 'react'
import 'bulma/css/bulma.css'
import { ParameterDetail } from './ParameterDetail';



export class ParametersList extends React.Component {

    render() {
        const { parameters } = this.props
        if (parameters == null || parameters.length == 0) {
            return <div>This control hasn't parameters</div>
        }

        return (
            <div className="ControlDetail-AtributeList">
                {
                    parameters.map((param, index) => {
                        return <div key={index}><ParameterDetail parameter={param}></ParameterDetail> </div>
                    })
                }
            </div>
        )
    }
}
