import React from 'react'
import PropTypes from 'prop-types'

class PersonInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <p><strong>{`${this.props.title}:`}</strong> {this.props.value}</p>
        )
    }
}

PersonInfo.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default PersonInfo
