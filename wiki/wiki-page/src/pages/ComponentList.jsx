import React from 'react'
import 'bulma/css/bulma.css'

export class ComponentList extends React.Component {

    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Components list</h1>
                        <h2 className="subtitle">Check all the componentes in the current release</h2>
                    </div>
                </div>
            </section>
        )
    }
}
