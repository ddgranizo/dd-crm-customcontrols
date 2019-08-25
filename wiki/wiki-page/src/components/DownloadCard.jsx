import React from 'react'
import 'bulma/css/bulma.css'


export class DownloadCard extends React.Component {

    render() {
        const { emoji, isRecomended, isManaged, date, url, version } = this.props
        const manageWord = isManaged ? "Managed" : "Unmanaged"
        return <div className="ListWrapItem card">
            <header className="card-header">
                <p className="card-header-title">{emoji} {manageWord} {isRecomended ? <span>(⭐⭐  RECOMENDED ⭐⭐)</span> : null}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    Download latest version  <a href="#">#{version}</a> as a <a href="#">{manageWord}</a> solution
                    <br />
                    <time dateTime="2016-1-1">📅 {date}</time>
                </div>
            </div>
            <footer className="card-footer">
                <a href={url} className="card-footer-item">Download 👇</a>
            </footer>
        </div>
    }
}
