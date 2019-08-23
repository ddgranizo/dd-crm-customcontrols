import React from 'react'
import 'bulma/css/bulma.css'

export class NotFound extends React.Component {

    render() {
        return (
            <section className="hero is-danger">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">404 Not found!</h1>
                        <h2 className="subtitle">This page doesn't exists</h2>
                    </div>
                </div>
            </section>
        )
    }
}
