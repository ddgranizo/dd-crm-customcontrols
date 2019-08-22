import React from 'react'
import 'bulma/css/bulma.css'
import { Body } from './Body';
import { Footer } from './Footer';
import { Title } from './Title';

export class Layout extends React.Component {

    render() {
        return (
            <div>
                <Title></Title>
                <Body></Body>
                <Footer></Footer>
            </div>
        )
    }
}
