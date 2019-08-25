import React from 'react'
import 'bulma/css/bulma.css'
import { Link, Router } from 'react-router-dom'
import { FaBeer, FaGithub } from 'react-icons/fa';

export class Title extends React.Component {


    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">

                    <a className="navbar-item" href="#"><div className="subtitle"> 💊</div></a>

                    <a className="navbar-item" style={{ padding: '0px' }} href="#"><h1 className="title is-5"> DD CustomControls for CRM Dynamics 365 </h1></a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item"><Link to={`/`}  >Home</Link></div>
                        <div className="navbar-item"><Link to={`/install`} >Documentation</Link></div>
                        <div className="navbar-item"><Link to={`/contact`} >Contact</Link></div>
                    </div >

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-light" href="https://github.com/ddgranizo/dd-crm-customcontrols" target="_blank">
                                    <span className="icon" >
                                        <FaGithub></FaGithub>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            </nav >
        )
    }
}
