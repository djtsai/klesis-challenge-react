import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'react-bootstrap/lib/Panel'
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable'
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn'

class LeaderboardPanel extends React.Component {
    render() {
        return (
            <Panel header={<h3>Team Leaderboard</h3>}>
                <BootstrapTable
                    data={this.props.teamsList}
                    striped={true}
                    options={{
                        defaultSortName: 'totalPoints',
                        defaultSortOrder: 'desc'
                    }}
                >
                    <TableHeaderColumn dataField="name" isKey={true}>
                        Team Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="totalPoints">
                        Total Points
                    </TableHeaderColumn>
                </BootstrapTable>
            </Panel>
        )
    }
}

LeaderboardPanel.propTypes = {
    teamsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            totalPoints: PropTypes.number.isRequired
        })
    ).isRequired
}

export default LeaderboardPanel
