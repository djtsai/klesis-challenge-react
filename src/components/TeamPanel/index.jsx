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
        const totalPoints = this.props.teamRoster.reduce((acc, person) => acc + person.totalPoints, 0)

        return (
            <Panel header={<h3>Team</h3>}>
                <PersonInfo title="Total Points" value={`${totalPoints}`}/>
                <BootstrapTable
                    data={this.props.teamRoster}
                    striped={true}
                    height="auto"
                >
                    <TableHeaderColumn
                        dataField="firstName"
                        dataFormat={(cell, row) => `${cell} ${row.lastName}`}
                        isKey={true}
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
    ).isRequired
}

export default TeamPanel
