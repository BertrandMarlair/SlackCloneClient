import React, { Suspense, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import UserStyle from './UserStyle'
import Title from '../../component/Typography/Title'
import SmallTitle from '../../component/Typography/SmallTitle'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import Loading from '../../component/CustomLoading/CustomLoading'
import CustomError from '../../component/CustomError/CustomError'
import Messaging from '../Messaging/MessagingContainer'

const ViewUser = (props) => {
    const { params } = props.match

    return (
        <DashboardLayout>
            {params && params.teamId ? (
                <Suspense fallback={<Loading />}>
                    <User {...props} />
                </Suspense>
            ): (
                <SmallTitle>Select team</SmallTitle>
            )}
        </DashboardLayout>
    )
}

const User = (props) => {
    console.log(props.match.params.teamId)
    const { loading, data, error } = useQuery(GET_TEAM, { variables: { id: parseInt(props.match.params.teamId) } })
    
    console.log(data)
    if (!loading && !data.getTeam) {
        return <Redirect to="/app/create-team" />
    }

    return (
        <Fragment>
            {loading && <Loading />}
            {error && <CustomError errorMessage={error} />}
            {data.getTeam && data.getTeam.channels[0] && (
                <Suspense fallback={<Loading />}>
                    <DirectMessage {...props} dataTeam={data.getTeam} />
                </Suspense>
            )}
        </Fragment>
    )
}

const DirectMessage = ({ match: { params: { userId, teamId } }, dataTeam, classes}) => {
    const { loading, data, error } = useQuery(
        GET_DIRECT_MESSAGE, 
        { 
            variables: { 
                teamId: parseInt(teamId) ,
                receiverId: parseInt(userId), 
            } 
        }
    )


    if (!loading && !data.getChannelById) {
        return <div>no direct message</div>
    }

    return (
        <Fragment>
            {userId}
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

const GET_DIRECT_MESSAGE = gql`
    query getDirectMessage($teamId: Int!, $receiverId: Int!) {
        getDirectMessage(teamId: $teamId, receiverId: $receiverId) {
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

export default withStyles(UserStyle)(ViewUser)