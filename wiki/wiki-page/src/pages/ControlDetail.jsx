import React from 'react'
import 'bulma/css/bulma.css'
import { ClipLoader } from 'react-spinners';

export class ControlDetail extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            control: null,
            selectedTab: 'info'
        }
    }


    async componentDidMount() {
        var response = await fetch(this.props.control)
        var control = await response.json()
        this.setState({ control, loading: false })
        console.log(control)
    }

    setActiveTab = (tab) => {
        this.setState({ selectedTab: tab })
    }


    renderTabContent(control) {
        const { currentVersion, description, image, infoBullets, instructions, name, parameters, emoji, githubPath } = control
        const { selectedTab } = this.state
        if (selectedTab === 'info') {
            return (<div>
                <div className="card-image">
                    <figure className="image">
                        <img src={image} alt="Real control snapshot" style={{ maxWidth: 'auto' }} />
                    </figure>
                </div>
                <div className="card-content">
                    <p>{description}</p>
                </div>
            </div>
            )
        }

        if (selectedTab === 'parameters') {
            if (parameters.length == 0) {
                return <div>This control hasn't parameters</div>
            }
            return (<div>
                {
                    parameters.map((param, index) => {
                        return <nav className="panel" key={index}>
                            <p className="panel-heading">{param.displayName}</p>
                            <div className="panel-block"><span><b>Display name: </b>{param.displayName}</span></div>
                            <div className="panel-block"><span><b>Name: </b>{param.name}</span></div>
                            <div className="panel-block"><span><b>Description: </b>{param.description}</span></div>
                            <div className="panel-block"><span><b>Type: </b>{param.type}</span></div>
                            <div className="panel-block"><span><b>Required: </b>{param.required ? "Yes" : "No"}</span></div>
                            <div className="panel-block"><span><b>Bound: </b>{param.bound ? "Yes" : "No"}</span></div>
                        </nav>
                    })
                }
            </div>
            )
        }
    }


    render() {
        const { loading, control, selectedTab } = this.state
        if (loading) {
            return <ClipLoader></ClipLoader>
        }

        const { currentVersion, description, image, infoBullets, instructions, name, parameters, emoji, githubPath } = control

        return (
            <div className="card ControlDetail-card">
                <header className="card-header">
                    <p className="card-header-title">
                        <span>{emoji}</span><span>{name}</span>
                    </p>
                </header>

                <div className="tabs is-centered">
                    <ul>
                        <li ><a onClick={() => { this.setActiveTab('info') }}>Info</a></li>
                        <li ><a onClick={() => { this.setActiveTab('parameters') }}>Parameters</a></li>
                        <li ><a onClick={() => { this.setActiveTab('instructions') }}>Instructions</a></li>
                        <li ><a onClick={() => { this.setActiveTab('notes') }}>Notes</a></li>
                    </ul>
                </div>
                {
                    this.renderTabContent(control)
                }
                <footer className="card-footer">
                    <p className="card-footer-item">
                        <span>Version: {currentVersion}</span>
                    </p>
                    <p className="card-footer-item">
                        <span>
                            View on <a href={githubPath}>Github</a>
                        </span>
                    </p>
                </footer>
            </div>
        )
    }
}
