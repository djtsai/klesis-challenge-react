import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import Collapse from 'react-bootstrap/lib/Collapse'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable'
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn'
import PersonInfo from '../PersonInfo'
import { utcTimestampToDate } from '../../utils/dateUtils'

class MePanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showTaskForm: false,
            selectedTask: 'select'
        }
    }

    render() {
        const { id, firstName, lastName, email, tasks, totalPoints } = this.props.person

        return (
            <Panel bsStyle="primary" header={<h3>Me</h3>}>
                <h4>Personal Information</h4>
                <PersonInfo title="Name" value={`${firstName} ${lastName}`}/>
                <PersonInfo title="Email" value={email}/>
                <PersonInfo title="Total Points" value={`${totalPoints}`}/>

                <hr/>

                <h4>Recent Tasks</h4>
                <BootstrapTable
                    data={tasks}
                    striped={true}
                    height="auto"
                    pagination={true}
                    options={{
                        defaultSortName: 'completedDate',
                        defaultSortOrder: 'desc',
                        paginationSize: 3,
                        sizePerPageList: [ 5, 10, 25 ],
                        sizePerPage: 10
                    }}
                >
                    <TableHeaderColumn dataField="name" dataSort={true} width="160px">
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
                <Button
                    bsStyle="primary"
                    onClick={() => this.setState({ showTaskForm: !this.state.showTaskForm })}
                >
                    Add Completed Task
                </Button>
                <Collapse in={this.state.showTaskForm} style={{ marginTop: "15px" }}>
                    <FormGroup controlId="tasks-select">
                        <InputGroup>
                            <FormControl
                                componentClass="select"
                                value={this.state.selectedTask}
                                onChange={e => this.setState({ selectedTask: e.target.value })}
                            >
                                <option value="select">--Select--</option>
                                {
                                    this.props.tasksList.map((task, index) => (
                                        <option key={index} value={task.id}>{`${task.name} - ${task.points} points`}</option>
                                    ))
                                }
                            </FormControl>
                            <InputGroup.Button>
                                <Button
                                    bsStyle="success"
                                    disabled={this.state.selectedTask === 'select'}
                                    onClick={() => {
                                        this.props.addCompletedTask(id, this.state.selectedTask)
                                        this.setState({ selectedTask: 'select' })
                                    }}
                                >
                                    Completed!
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Collapse>
            </Panel>
        )
    }
}

MePanel.propTypes = {
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
    ).isRequired
}

export default MePanel
