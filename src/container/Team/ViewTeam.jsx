import React, { Suspense, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import TeamStyle from './TeamStyle'
import Title from '../../component/Typography/Title'
import SmallTitle from '../../component/Typography/SmallTitle'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import Loading from '../../component/CustomLoading/CustomLoading'
import CustomError from '../../component/CustomError/CustomError'
import Messaging from '../Messaging/MessagingContainer'

const ViewTeam = (props) => {
    const { params } = props.match

    return (
        <DashboardLayout>
            {params && params.teamId ? (
                <Suspense fallback={<Loading />}>
                    <Team {...props} />
                </Suspense>
            ): (
                <SmallTitle>No Channel</SmallTitle>
            )}
        </DashboardLayout>
    )
}

const Team = (props) => {
    const { loading, data, error } = useQuery(GET_TEAM, { variables: { id: parseInt(props.match.params.teamId) } })

    if (!loading && !data.getTeam) {
        return <Redirect to="/app/create-team" />
    }

    return (
        <Fragment>
            {loading && <Loading />}
            {error && <CustomError errorMessage={error} />}
            {data.getTeam && data.getTeam.channels[0] && (
                <Suspense fallback={<Loading />}>
                    <Channel {...props} dataTeam={data.getTeam} />
                </Suspense>
            )}
        </Fragment>
    )
}

const Channel = ({ match: { params }, dataTeam, classes}) => {
    const { loading, data, error } = useQuery(
        GET_CHANNEL, 
        { 
            variables: { 
                id: params.channelId ? parseInt(params.channelId) : dataTeam.channels[0].id, 
                teamId: parseInt(params.teamId) 
            } 
        }
    )


    if (!loading && !data.getChannelById) {
        return <Redirect to="/app/create-team" />
    }

    return (
        <Fragment>
            {loading && <Loading />}
            {error && <CustomError errorMessage={error} />}
            {data && data.getChannelById && (
                <div className={classes.containerMessage}>
                    <div>
                        <Title centered>{data.getChannelById.name}</Title>
                    </div>
                    <Messaging
                        channelId={data.getChannelById.id}
                    />
                </div>
            )}
        </Fragment>
    )
}

const GET_CHANNEL = gql`
    query getChannelById($id: Int!, $teamId: Int!) {
        getChannelById(id: $id, teamId: $teamId) {
            id
            name
        }
    }
`

const GET_TEAM = gql`  
    query getTeam($id: Int!) {
        getTeam(id: $id) {
            id
            channels{
                id
            }
        }
    }
`

export default withStyles(TeamStyle)(ViewTeam)