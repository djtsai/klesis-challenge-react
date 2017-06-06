import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'
import Notifications, { notify } from 'react-notify-toast'
import Login from './Login'
import Registration from './Registration'
import Home from './Home'

function mapStateToProps(state) {
    return {
        redirect: state.redirect,
        toast: state.toast
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {}

    return bindActionCreators(actions, dispatch)
}

class KlesisChallenge extends React.Component {
    constructor(props) {
        super(props)

        this.show = notify.createShowQueue()
    }

    componentWillMount() {
        if (this.props.match.isExact) {
            this.props.history.push('/registration')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast.show) {
            this.show(nextProps.toast.message, nextProps.toast.type, 3000, {})
        }

        if (nextProps.redirect !== this.props.redirect && nextProps.redirect !== '') {
            this.props.history.push(nextProps.redirect)
        }
    }

    render() {
        return (
            <Grid className="klesis-challenge-container" fluid={true}>
                <Notifications/>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Grid>
        )
    }
}

KlesisChallenge.propTypes = {
    redirect: PropTypes.string.isRequired,
    toast: PropTypes.shape({
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
            'success',
            'warning',
            'error',
            ''
        ]).isRequired
    }).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(KlesisChallenge)
