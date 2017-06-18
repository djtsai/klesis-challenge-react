import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './dashboard'
import RedirectHome from '../../components/RedirectHome'
import { isLoggedIn } from '../../utils/authManagement'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!isLoggedIn()) {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/" component={RedirectHome}/>
            </Switch>
        )
    }
}

export default Home
