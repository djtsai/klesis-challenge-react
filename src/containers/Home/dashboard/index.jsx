import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Panel from 'react-bootstrap/lib/Panel'
import NavHeader from '../../../components/NavHeader'
import MePanel from '../../../components/MePanel'
import TeamPanel from '../../../components/TeamPanel'
import * as PersonActions from '../../../actions/personActions'
import * as TasksActions from '../../../actions/taskActions'
import { getLoggedInEmail } from '../../../utils/authManagement'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

function mapStateToProps(state) {
    return {
        person: state.person,
        tasksList: state.tasksList,
        teamRoster: state.teamRoster,
        teamsList: state.teamsList
    }
}

function mapDispatchToProps(dispatch) {
    const actions = { ...PersonActions, ...TasksActions }

    return bindActionCreators(actions, dispatch)
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (this.props.person.id === 0) {
            this.props.getPerson(getLoggedInEmail())
        }

        this.props.getTasks()
    }

    render() {
        return (
            <div className="dashboard-container">
                <NavHeader name={this.props.person.firstName}/>
                <Jumbotron>
                    <PageHeader>Welcome to Klesis Summer Challenge 2017!</PageHeader>
                    <p>Let's grow together!</p>
                </Jumbotron>
                <Grid fluid={true} style={{ padding: "0" }}>
                    <Row>
                        <Col md={12} lg={4}>
                            <MePanel
                                person={this.props.person}
                                tasksList={this.props.tasksList}
                                addCompletedTask={this.props.addCompletedTask}
                            />
                        </Col>
                        <Col md={12} lg={4}>
                            <TeamPanel teamRoster={this.props.teamRoster}/>
                        </Col>
                        <Col md={12} lg={4}>
                            <Panel header={<h3>All</h3>}>
                                Test
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getPerson: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    addCompletedTask: PropTypes.func.isRequired,
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        teamId: PropTypes.number.isRequired,
        tasks: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                points: PropTypes.number.isRequired,
                completedDate: PropTypes.number.isRequired
            })
        ).isRequired,
        totalPoints: PropTypes.number.isRequired
    }).isRequired,
    tasksList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired
        })
    ).isRequired,
    teamRoster: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            teamId: PropTypes.number.isRequired,
            tasks: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    points: PropTypes.number.isRequired,
                    completedDate: PropTypes.number.isRequired
                })
            ).isRequired,
            totalPoints: PropTypes.number.isRequired
        })
    ).isRequired,
    teamsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            totalPoints: PropTypes.number.isRequired
        })
    ).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
