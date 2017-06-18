import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import { logout } from '../../utils/authManagement'

import Logo from '../../assets/Klesis_Logo.jpg'

class NavHeader extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.context = context

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        logout()
        this.context.router.history.push('/login')
    }

    render() {
        return (
            <Navbar>
                <Link to="/">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={Logo}/>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Link>
                <Nav bsStyle="tabs">
                    <NavItem>Dashboard</NavItem>
                </Nav>
                <Navbar.Text>{`Welcome, ${this.props.name}!`}</Navbar.Text>
                <Nav pullRight>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Nav>
            </Navbar>
        )
    }
}

NavHeader.propTypes = {
    name: PropTypes.string.isRequired
}

NavHeader.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NavHeader
