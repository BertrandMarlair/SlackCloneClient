import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { compose } from 'recompose'
import SideBarStyle from './SideBarStyle'
import { withRouter } from 'react-router-dom'
import SideLeftBar from './components/SideLeftBar'
import SideRightBar from './components/SideRightBar'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

const SideBar = ({ classes, match: { params } }) => {
    const [currentTeamId, setCurrentTeamId] = useState(params.teamId ? parseInt(params.teamId) : null)

    useEffect(() => {
        console.log(params)
        const teamId = params.teamId ? parseInt(params.teamId) : null
        setCurrentTeamId(teamId)
    }, [params])

    const teams = useQuery(ALL_TEAM)
    const getTeams = teams.data && teams.data.allTeams ? teams.data.allTeams : []
    const currentIndexTeam = getTeams.findIndex(team => team.id === currentTeamId)
    const currentTeam = currentIndexTeam > -1 ? getTeams[currentIndexTeam] : {}
    const channels = currentTeam && currentTeam.channels ? currentTeam.channels : []

    return (
        <div className={classes.sideBar}> 
            <SideRightBar channels={channels} teamName={currentTeam.name}/>
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

export default compose(
    withRouter,
    withStyles(SideBarStyle),
)(SideBar) 