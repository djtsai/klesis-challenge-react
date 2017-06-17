import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link }  from 'react-router-dom'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import * as LoginActions from '../../actions/loginActions'
import { isLoggedIn } from '../../utils/authManagement'
import { validateEmail } from '../../utils/validation'

import './index.scss'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const actions = LoginActions

    return bindActionCreators(actions, dispatch)
}

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
    }

    componentWillMount() {
        if (isLoggedIn()) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <Row className="login-container">
                <Col xs={12} sm={6} smOffset={3}>
                    <Panel header={<PageHeader className="login-header">Login</PageHeader>}>
                        <FormGroup controlId="email" validationState={validateEmail(this.state.email)}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.email}
                                placeholder="john.smith@example.com"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <div className="login-button">
                            <Button
                                bsStyle="primary"
                                disabled={validateEmail(this.state.email) !== 'success'}
                                onClick={() => this.props.login(this.state.email)}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="registration-link">
                            <Link to="/registration">Register here</Link>
                        </div>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
