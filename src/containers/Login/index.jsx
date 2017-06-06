import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import PageHeader from 'react-bootstrap/lib/PageHeader'

import './index.scss'

class Login extends React.Component {
    render() {
        return (
            <Row className="login-container">
                <Col xs={12} sm={6} smOffset={3}>
                    <PageHeader className="login-header">App is coming soon!</PageHeader>
                </Col>
            </Row>
        )
    }
}

export default Login
