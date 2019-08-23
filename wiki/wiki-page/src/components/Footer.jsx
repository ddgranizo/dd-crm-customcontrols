import React from 'react'
import 'bulma/css/bulma.css'

export class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>DD.Crm.CustomControls</strong> by <a href="mailto:ddgranizo@gmail.com">Daniel Díaz Granizo</a>. Check my <a href="https://github.com/ddgranizo" target="_blank">GitHub</a> page or my <a href="https://www.linkedin.com/in/daniel-diaz-granizo-107119115/" target="_blank">Linkedin</a> profile.
                    </p>
                </div>
            </footer>

        )
    }
}
