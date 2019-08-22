import React from 'react'
import 'bulma/css/bulma.css'

export class Title extends React.Component {


    render() {
        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="../public/logo.png" width="28" height="28" />
                    </a>
                    <a class="navbar-item" href="https://bulma.io">
                        <h1 class="title is-4"> DD.Crm.CustomControls </h1>
                    </a>
                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item"> Home </a>

                        <a class="navbar-item"> Documentation </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">  More   </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">   About </a>
                                <a class="navbar-item">  Jobs </a>
                                <a class="navbar-item"> Contact   </a>
                                <hr class="navbar-divider" />
                                <a class="navbar-item"> Report an issue  </a>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
