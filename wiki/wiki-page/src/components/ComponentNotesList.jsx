import React from 'react'
import 'bulma/css/bulma.css'



export class ComponentNotesList extends React.Component {

    render() {
        const { notes } = this.props
        if (notes == null || notes.length == 0) {
            return <div>This control hasn't notes</div>
        }

        return (
            <div clasName="ControlDetail-AtributeList">
                {
                    notes.map((note, index) => {
                        return <div key={index}>
                            <p>{note}</p>
                        </div>
                    })
                }
            </div>
        )
    }
}
