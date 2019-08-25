import React from 'react'
import 'bulma/css/bulma.css'
import { ControlDetail } from './../components/ControlDetail';

export class ControlList extends React.Component {


    render() {
        const { controls } = this.props
        return (
            <article className="message is-warning Home-leftAligned">
               
                <div className="message-body ControlList-mainBody">
                    <div className="ListWrapItems level">
                        {
                            controls.map((control, index) => {
                                return <div className="ListWrapItem level-item has-text-centered" key={index}><ControlDetail control={control} ></ControlDetail></div>
                            }) 
                        }
                    </div>
                </div>
            </article>
        )
    }
}
