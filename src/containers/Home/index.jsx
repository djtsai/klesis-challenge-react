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
import NavHeader from '../../components/NavHeader'
import PersonInfo from '../../components/PersonInfo'
import * as PersonActions from '../../actions/personActions'
import { isLoggedIn, getLoggedInEmail } from '../../utils/authManagement'

function mapStateToProps(state) {
    return {
        person: state.person
    }
}

function mapDispatchToProps(dispatch) {
    const actions = PersonActions

    return bindActionCreators(actions, dispatch)
}

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!isLoggedIn()) {
            this.props.history.push('/login')
        } else if (this.props.person.id === 0) {
            this.props.getPerson(getLoggedInEmail())
        }
    }

    render() {
        const { firstName, lastName, email, totalPoints } = this.props.person

        return (
            <div className="home-container">
                <NavHeader name={firstName}/>
                <Jumbotron>
                    <PageHeader>Welcome to Klesis Summer Challenge 2017!</PageHeader>
                    <p>Let's grow together!</p>
                </Jumbotron>
                <Grid fluid={true} style={{ padding: "0" }}>
                    <Row>
                        <Col sm={12} md={4}>
                            <Panel header={<h3>Me</h3>}>
                                <PersonInfo title="Name" value={`${firstName} ${lastName}`}/>
                                <PersonInfo title="Email" value={email}/>
                                <PersonInfo title="Total Points" value={totalPoints}/>
                            </Panel>
                        </Col>
                        <Col sm={12} md={4}>
                            <Panel header={<h3>Team</h3>}>
                                Test
                            </Panel>
                        </Col>
                        <Col sm={12} md={4}>
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

Home.propTypes = {
    getPerson: PropTypes.func.isRequired,
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        tasks: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                points: PropTypes.number.isRequired,
                completedDate: PropTypes.number.isRequired
            })
        ).isRequired,
        totalPoints: PropTypes.number.isRequired
    }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
