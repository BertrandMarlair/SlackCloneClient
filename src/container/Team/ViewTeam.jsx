import React from 'react'
import { withStyles } from '@material-ui/core'
import TeamStyle from './TeamStyle'
import Title from '../../component/Typography/Title'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

const ViewTeam = ({ classes, history, match: { params }}) => {
    console.log(params)
    const getChannel = useQuery(GET_CHANNEL, { variables: { id: parseInt(params.channelId), teamId: parseInt(params.teamId) } })
    console.log(getChannel)
    return (
        <DashboardLayout>
            <Title centered>{getChannel && getChannel.data && getChannel.data.getChannelById ? getChannel.data.getChannelById.name : 'nothing'}</Title>
            {params.teamId}
            {params.channelId}
        </DashboardLayout>
    )
}

const GET_CHANNEL = gql`
    query getChannelById($id: Int!, $teamId: Int!) {
        getChannelById(id: $id, teamId: $teamId) {
            name
        }
    }
`

export default withStyles(TeamStyle)(ViewTeam)