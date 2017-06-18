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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import NavHeader from '../../components/NavHeader'
import PersonInfo from '../../components/PersonInfo'
import * as PersonActions from '../../actions/personActions'
import { isLoggedIn, getLoggedInEmail } from '../../utils/authManagement'
import { utcTimestampToDate } from '../../utils/dateUtils'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

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
        const { firstName, lastName, email, tasks, totalPoints } = this.props.person

        return (
            <div className="home-container">
                <NavHeader name={firstName}/>
                <Jumbotron>
                    <PageHeader>Welcome to Klesis Summer Challenge 2017!</PageHeader>
                    <p>Let's grow together!</p>
                </Jumbotron>
                <Grid fluid={true} style={{ padding: "0" }}>
                    <Row>
                        <Col md={12} lg={4}>
                            <Panel header={<h3>Me</h3>}>
                                <PersonInfo title="Name" value={`${firstName} ${lastName}`}/>
                                <PersonInfo title="Email" value={email}/>
                                <PersonInfo title="Total Points" value={`${totalPoints}`}/>
                                <BootstrapTable
                                    data={tasks}
                                    striped={true}
                                    height="auto"
                                    pagination={true}
                                    options={{
                                        defaultSortName: 'completedDate',
                                        defaultSortOrder: 'desc',
                                        sizePerPageList: [ 5, 10, 25 ],
                                        sizePerPage: 5
                                    }}
                                >
                                    <TableHeaderColumn dataField="name" width="160px">
                                        Task Name
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="points" width="45px">
                                        Pts.
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="completedDate"
                                        dataFormat={cell => utcTimestampToDate(cell)}
                                        isKey={true}
                                        dataSort={true}
                                        width="160px"
                                    >
                                        Completed Date
                                    </TableHeaderColumn>
                                </BootstrapTable>
                            </Panel>
                        </Col>
                        <Col md={12} lg={4}>
                            <Panel header={<h3>Team</h3>}>
                                Test
                            </Panel>
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
