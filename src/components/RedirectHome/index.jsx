import React from 'react'
import PropTypes from 'prop-types'

class RedirectHome extends React.Component {
    componentWillMount() {
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

RedirectHome.propTypes = {
    history: PropTypes.object.isRequired
}

export default RedirectHome
