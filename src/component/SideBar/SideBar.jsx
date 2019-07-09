import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from './SideBarStyle'
import { withRouter, Redirect } from 'react-router-dom'
import SideLeftBar from './components/SideLeftBar'
import SideRightBar from './components/SideRightBar'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

const SideBar = ({ classes, match: { params }, history, location }) => {

    const [currentTeamId, setCurrentTeamId] = useState(params.teamId ? parseInt(params.teamId) : null)

    const user = useQuery(CURRENT_USER)
    console.log(user)

    const createChannelMutation = useMutation(CREATE_CHANNEL, { refetchQueries: ['getCurrentUser'],  
        update: (proxy, { data: { createChannel } }) => {
            if (!createChannel.ok) return
            history.push(`/app/view-team/${currentTeamId}/${createChannel.channel.id}`)
        }
    }) 

    const createUserInvitelMutation = useMutation(INVITE_USER_TO_TEAM) 

    const currentUser = user.data && user.data.getCurrentUser ? user.data.getCurrentUser : {}
    console.log(currentUser)
    const getTeams = currentUser && currentUser.teams ? currentUser.teams : []
    // const getInviteTeams = teams.data && teams.data.inviteTeams ? teams.data.inviteTeams : []
    const allTeams = [...getTeams]
    const currentIndexTeam = allTeams.findIndex(team => team.id === currentTeamId)
    const currentTeam = currentIndexTeam > -1 ? allTeams[currentIndexTeam] : allTeams ? allTeams[0] : {}
    const channels = currentTeam && currentTeam.channels ? currentTeam.channels : []

    useEffect(() => {
        if (location.pathname.slice(0, 14) === '/app/view-team'){
            const teamId = params.teamId ? parseInt(params.teamId) : null
            setCurrentTeamId(teamId)
            if (!params.teamId && currentTeam) {
                history.push(`/app/view-team/${currentTeam.id}/`)
            }
        }
    }, [currentTeam, history, params, location])

    if (!user.loading && !allTeams.length){
        return <Redirect to="/app/create-team" />
    }

    return (
        <div className={classes.sideBar}> 
            <SideRightBar 
                channels={channels}
                team={currentTeam} 
                createChannelMutation={createChannelMutation} 
                createUserInvitelMutation={createUserInvitelMutation} 
            />
            <SideLeftBar 
                teams={getTeams} 
                inviteTeams={[]} 
            />
        </div>
    )
}

const CURRENT_USER = gql`  
    query getCurrentUser {
        getCurrentUser {
            id
            username
            teams {
                id
                name
                admin
                channels{
                    id
                    name
                    public
                }
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

const INVITE_USER_TO_TEAM = gql`
    mutation addTeamMember($email: String!, $teamId: Int!) {
        addTeamMember(email: $email, teamId: $teamId) {
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