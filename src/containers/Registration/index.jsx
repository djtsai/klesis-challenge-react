import React from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import { validateEmail } from '../../utils/validation'

import './index.scss'

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

    validateRegistration() {
        return validateEmail(this.state.email) === 'success'
            && this.state.firstName.length !== 0
            && this.state.lastName.length !== 0
    }

    render() {
        return (
            <div className="registration-container">
                <PageHeader className="registration-header">Registration</PageHeader>
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
                <FormGroup controlId="firstName" validationState={this.state.firstName.length === 0 ? null : 'success'}>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.firstName}
                        placeholder="John"
                        onChange={e => this.setState({ firstName: e.target.value })}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup controlId="lastName" validationState={this.state.lastName.length === 0 ? null : 'success'}>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.lastName}
                        placeholder="Smith"
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <div className="registration-submit-button">
                    <Button bsStyle="primary" disabled={!this.validateRegistration()}>Submit</Button>
                </div>
            </div>
        )
    }
}

export default Registration
