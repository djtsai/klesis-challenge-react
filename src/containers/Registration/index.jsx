import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import * as RegistrationActions from '../../actions/registrationActions'
import { isLoggedIn } from '../../utils/authManagement'
import { validateEmail, validateName, escape } from '../../utils/validation'

import './index.scss'

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    const actions = RegistrationActions

    return bindActionCreators(actions, dispatch)
}

class Registration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            firstName: '',
            lastName: ''
        }

        this.validateRegistration = this.validateRegistration.bind(this)
    }

    componentWillMount() {
        if (isLoggedIn()) {
            this.props.history.push('/')
        }
    }

    validateRegistration() {
        return validateEmail(this.state.email) === 'success'
            && validateName(this.state.firstName) === 'success'
            && validateName(this.state.lastName) === 'success'
    }

    render() {
        const { email, firstName, lastName } = this.state

        return (
            <Row className="registration-container">
                <Col xs={12} sm={6} smOffset={3}>
                    <Panel header={<PageHeader className="registration-header">Registration</PageHeader>}>
                        <FormGroup controlId="email" validationState={validateEmail(email)}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={email}
                                placeholder="john.smith@example.com"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="firstName" validationState={firstName.length === 0 ? null : 'success'}>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={firstName}
                                placeholder="John"
                                onChange={e => this.setState({ firstName: e.target.value })}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <FormGroup controlId="lastName" validationState={lastName.length === 0 ? null : 'success'}>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={lastName}
                                placeholder="Smith"
                                onChange={e => this.setState({ lastName: e.target.value })}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <div className="registration-submit-button">
                            <Button
                                bsStyle="primary"
                                disabled={!this.validateRegistration()}
                                onClick={() => this.props.register(escape(email), escape(firstName), escape(lastName))}
                            >
                                Submit
                            </Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
        )
    }
}

Registration.propTypes = {
    register: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
