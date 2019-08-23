import React from 'react'
import 'bulma/css/bulma.css'




export class InstructionDetail extends React.Component {

    render() {
        const { name, description, image } = this.props.instruction

        return (<nav className="panel">
            <p className="panel-heading">{name}</p>

            <div className="panel-body">
                <div className="panel-block">
                    {description}
                </div>
                <div className="panel-block">
                    <figure className="image">
                        <img src={image} alt="Real control snapshot" style={{ maxWidth: 'auto', margin: '6px' }} />
                    </figure>
                </div>
            </div>
        </nav>)
    }
}

