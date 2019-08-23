import React from 'react'
import 'bulma/css/bulma.css'
import { ClipLoader } from 'react-spinners';
import { ParametersList } from './ParametersList';
import { InstructionsList } from './InstructionsList';

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
        const { currentVersion, description, image, infoBullets, instructions, name, parameters, emoji, githubPath, releaseNotes } = control
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
        else if (selectedTab === 'parameters') {
            return ( <ParametersList parameters={parameters}></ParametersList>)
        }
        else if (selectedTab === 'instructions') {
            return ( <InstructionsList instructions={instructions}></InstructionsList>)
        }
        else if (selectedTab === 'notes') {
            return ( <InstructionsList instructions={instructions}></InstructionsList>)
        }
    }


    render() {
        const { loading, control, selectedTab } = this.state
        if (loading) {
            return <ClipLoader></ClipLoader>
        }

        const { currentVersion, name, emoji, githubPath } = control

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
