import React from 'react'
import { withStyles } from '@material-ui/core'
import TeamStyle from './TeamStyle'
import Title from '../../component/Typography/Title'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'

const ViewTeam = ({ classes, history, match: { params }}) => {
    return (
        <DashboardLayout>
            <Title centered>ViewTeam</Title>
            {params.teamId}
            {params.channelId}
        </DashboardLayout>
    )
}

export default withStyles(TeamStyle)(ViewTeam)