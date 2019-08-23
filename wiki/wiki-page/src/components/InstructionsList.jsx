import React from 'react'
import 'bulma/css/bulma.css'
import { InstructionDetail } from './InstructionDetail'


export class InstructionsList extends React.Component {

    render() {
        const { instructions } = this.props
        if (instructions == null || instructions.length == 0) {
            return <div>This control hasn't instructions</div>
        }

        return (
            <div>
                {
                    instructions.map((step, index) => {
                        return <div  key={index}><InstructionDetail instruction={step}></InstructionDetail> </div>
                    })
                }
            </div>
        )
    }
}
