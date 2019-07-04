import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from './SideBarStyle'
import { withRouter } from 'react-router-dom'
import SideLeftBar from './components/SideLeftBar'
import SideRightBar from './components/SideRightBar'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

const SideBar = ({ classes, match: { params } }) => {
    const [currentTeamId, setCurrentTeamId] = useState(params.teamId ? parseInt(params.teamId) : null)

    useEffect(() => {
        const teamId = params.teamId ? parseInt(params.teamId) : null
        setCurrentTeamId(teamId)
    }, [params])

    const teams = useQuery(ALL_TEAM)
    const createChannelMutation = useMutation(CREATE_CHANNEL, {
        update: (proxy, {data, ok}) => {
            if (!ok) return
            currentTeam.channels.push(data.createChannel.channel)
        }
    }) 

    const getTeams = teams.data && teams.data.allTeams ? teams.data.allTeams : []
    const currentIndexTeam = getTeams.findIndex(team => team.id === currentTeamId)
    const currentTeam = currentIndexTeam > -1 ? getTeams[currentIndexTeam] : getTeams ? getTeams[0] : {}
    const channels = currentTeam && currentTeam.channels ? currentTeam.channels : []

    return (
        <div className={classes.sideBar}> 
            <SideRightBar 
                channels={channels}
                team={currentTeam} 
                createChannelMutation={createChannelMutation} 
            />
            <SideLeftBar teams={getTeams} />
        </div>
    )
}

const ALL_TEAM = gql`  
    query allTeams {
        allTeams {
            id
            name
            channels{
                id
                name
                public
            }
        }
}
`

const CREATE_CHANNEL = gql`
    mutation createChannel($teamId: Int!, $channelName: String!) {
        createChannel(teamId: $teamId, name: $channelName) {
            channel {
                id
                name
                public
            }
            ok
            errors {
                path
                message
            }
        }
    }
`

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideBar) 