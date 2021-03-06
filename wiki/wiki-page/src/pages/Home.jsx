import React from 'react'
import 'bulma/css/bulma.css'
import { ControlList } from './../components/ControlList';
import { ClipLoader } from 'react-spinners';
import { DownloadCard } from '../components/DownloadCard';

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
        this.setState({ loading: false, releaseInfo })
    }

    renderDownloadSection() {
        const { latestReleaseManagedUrl, latestReleaseUnamanagedUrl, currentVersion, latestReleaseDate } = this.state.releaseInfo

        return (
            <article className="message is-info Home-leftAligned">
                <div className="message-header">
                    Download latest release 🔽🔻🔽
                </div>
                <div className="message-body Home-DownloadSection AdjustPaddingScreen Home-DownloadSection">
                    <div className="content">
                        <div className="level">
                            <div className="level-left w100">
                                <div className="ListWrapItems w100">
                                    <DownloadCard
                                        emoji="📕"
                                        isRecomended={true}
                                        isManaged={true}
                                        date={latestReleaseDate}
                                        url={latestReleaseManagedUrl}
                                        version={currentVersion}
                                    />
                                     <DownloadCard
                                        emoji="📗"
                                        isRecomended={false}
                                        isManaged={false}
                                        date={latestReleaseDate}
                                        url={latestReleaseUnamanagedUrl}
                                        version={currentVersion}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>)

    }


    renderReleasesNotes() {
        const { releaseNotes } = this.state.releaseInfo

        if (releaseNotes.length == 0) {
            return <p>Current version hasn't release notes</p>
        }
        const latestRelease = releaseNotes[0]

        return (
            <article className="message is-info Home-leftAligned AdjustPaddingScreen">
                <div className="message-header">
                    Lastest release notes 🔥🔥🔥
                </div>
                <div className="message-body">
                    <div className="content">
                        <div className="level">
                            <div className="level-left">
                                <ul >
                                    {
                                        latestRelease.bullets.map((bullet, index) => {
                                            return <li key={index}>{bullet}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </article>)

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
                            <h1 className="title">💊 {projectName} v {currentVersion} 💊</h1>
                            <h2 className="subtitle">{projectDescription}</h2>
                            {this.renderDownloadSection()}
                            {this.renderReleasesNotes()}
                        </div>
                    </div>
                </section>

                <section className="hero is-warning">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">⚡ Components list ⚡</h1>
                            <h2 className="subtitle">Check all the componentes in the current release</h2>
                            <ControlList controls={controls}></ControlList>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
