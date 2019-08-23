import React from 'react'
import 'bulma/css/bulma.css'
import { ComponentList } from './ComponentList';
import { ClipLoader } from 'react-spinners';

export class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            releaseInfo: null
        }
    }


    async componentDidMount() {
        const response = await fetch("https://raw.githubusercontent.com/ddgranizo/dd-crm-customcontrols/master/wiki/wiki.json")
        const releaseInfo = await response.json()
        console.log(releaseInfo);
        this.setState({loading: false, releaseInfo})
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return <ClipLoader></ClipLoader>
        }

        const {controls, currentVersion, projectDescription, projectName, releaseNotes} = this.state.releaseInfo
        return (
            <div>
                <section className="hero is-info">
                    <div className="hero-body">
                        <div className="container">
                            <span><h1 className="title">{projectName}</h1><h2>{currentVersion}</h2></span>
                            <h2 className="subtitle">{projectDescription}</h2>

                        </div>
                    </div>
                </section>

                <section className="hero is-warning">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Components list</h1>
                            <h2 className="subtitle">Check all the componentes in the current release</h2>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
