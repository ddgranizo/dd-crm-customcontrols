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
        this.setState({ loading: false, releaseInfo })
    }


    renderReleasesNotes() {
        const { releaseNotes } = this.state.releaseInfo

        if (releaseNotes.length == 0) {
            return <p>Current version hasn't release notes</p>
        }

        const latestRelease = releaseNotes[0]
        console.log(latestRelease)
        return (
            <div>
                <p> Release notes of current version</p> 
                <ul>
                    {
                        latestRelease.bullets.map((bullet, index) => {
                            return <li key={index}>{bullet}</li>
                        })
                    }
                </ul>
            </div>)
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return <ClipLoader></ClipLoader>
        }

        const { controls, currentVersion, projectDescription, projectName } = this.state.releaseInfo
        return (
            <div>
                <section className="hero is-info">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">{projectName} v {currentVersion}</h1>
                            <h2 className="subtitle">{projectDescription}</h2>
                            {this.renderReleasesNotes()}
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
