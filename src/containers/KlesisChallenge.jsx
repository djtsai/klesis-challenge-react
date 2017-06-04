import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Home from './Home'

class KlesisChallenge extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/" component={Home}/>
            </Switch>
        )
    }
}

export default KlesisChallenge
