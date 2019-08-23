import React from 'react'
import 'bulma/css/bulma.css'
import { Switch, Route } from 'react-router-dom'
import { Home } from './../pages/Home'
import { ControlDetail } from './../pages/ControlDetail'
import { Contact } from './../pages/Contact'
import { Installation } from './../pages/Installation'
import { NotFound } from '../pages/NotFound';


export class Body extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/install' component={Installation} />
                <Route exact path='/contact' component={Contact} />
                <Route path='/detail/:id' component={ControlDetail} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}
