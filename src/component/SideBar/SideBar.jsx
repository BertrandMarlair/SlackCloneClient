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

    const createUserInvitelMutation = useMutation(INVITE_USER_TO_TEAM) 
    const createChannelMutation = useMutation(CREATE_CHANNEL, { refetchQueries: ['getCurrentUser'],  
        update: (proxy, { data: { createChannel } }) => {
            if (!createChannel.ok) return
            history.push(`/app/view-team/${currentTeamId}/${createChannel.channel.id}`)
        }
    }) 


    const currentUser = user.data && user.data.getCurrentUser ? user.data.getCurrentUser : {}
    const getTeams = currentUser && currentUser.teams ? currentUser.teams : []
    const allTeams = [...getTeams]
    const currentIndexTeam = allTeams.findIndex(team => team.id === currentTeamId)
    const currentTeam = currentIndexTeam > -1 ? allTeams[currentIndexTeam] : allTeams ? allTeams[0] : {}
    const channels = currentTeam && currentTeam.channels ? currentTeam.channels : []
    const directMessageMembers = currentTeam && currentTeam.directMessageMembers ? currentTeam.directMessageMembers : []

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
                directMessageMembers={directMessageMembers}
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
                directMessageMembers {
                    id
                    username
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