import React from 'react'
import 'bulma/css/bulma.css'
import { ControlDetail } from './ControlDetail';

export class ControlList extends React.Component {


    render() {
        const { controls } = this.props
        return (
            <article className="message is-warning Home-leftAligned">
                <div className="message-header">
                    Component List
                </div>
                <div className="message-body">
                    <div className="level">
                        {
                            controls.map((control, index) => {
                                return <div className="level-item has-text-centered" key={index}><ControlDetail control={control} ></ControlDetail></div>
                            })
                        }
                    </div>
                </div>
            </article>
        )
    }
}
