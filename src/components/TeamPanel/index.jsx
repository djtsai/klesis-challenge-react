import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'react-bootstrap/lib/Panel'
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable'
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn'
import PersonInfo from '../PersonInfo'

class TeamPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const teamRoster = this.props.teamRoster
        const totalPoints = teamRoster.reduce((acc, person) => acc + person.totalPoints, 0)
        const team = this.props.teamsList.find(team => team.id === this.props.person.teamId) || {}

        return (
            <Panel bsStyle="primary" header={<h3>{`Team - ${team.name || ''}`}</h3>}>
                <h4>Team Information</h4>
                <PersonInfo title="Team Name" value={team.name || ''}/>
                <PersonInfo title="Total Points" value={`${totalPoints}`}/>

                <hr/>

                <h4>Team Members</h4>
                <BootstrapTable
                    data={teamRoster}
                    striped={true}
                    height="auto"
                    options={{
                        defaultSortName: 'totalPoints',
                        defaultSortOrder: 'desc'
                    }}
                >
                    <TableHeaderColumn
                        dataField="firstName"
                        dataFormat={(cell, row) => `${cell} ${row.lastName}`}
                        isKey={true}
                        dataSort={true}
                    >
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="totalPoints" dataSort={true}>
                        Points
                    </TableHeaderColumn>
                </BootstrapTable>
            </Panel>
        )
    }
}

TeamPanel.propTypes = {
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

export default TeamPanel
