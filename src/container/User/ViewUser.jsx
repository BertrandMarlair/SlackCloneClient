import React, { Suspense, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import UserStyle from './UserStyle'
import SmallTitle from '../../component/Typography/SmallTitle'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'
import Loading from '../../component/CustomLoading/CustomLoading'
import CustomError from '../../component/CustomError/CustomError'
import Messaging from './Messaging/MessagingContainer'

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

const User = ({ classes, match: { params: { userId, teamId } }}) => {
    const { loading, data, error } = useQuery(GET_TEAM, { variables: { id: parseInt(teamId) } })

    if (!loading && !data.getTeam) {
        return <Redirect to="/app/create-team" />
    }

    return (
        <Fragment>
            {loading && <Loading />}
            {error && <CustomError errorMessage={error} />}
            {data.getTeam && (
                <Messaging
                    teamId={parseInt(teamId)}
                    userId={parseInt(userId)}
                />
            )}
        </Fragment>
    )
}

const GET_TEAM = gql`  
    query getTeam($id: Int!) {
        getTeam(id: $id) {
            id
            name
        }
    }
`

export default withStyles(UserStyle)(ViewUser)