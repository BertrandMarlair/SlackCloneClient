import React, { Suspense, Fragment } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { withStyles } from '@material-ui/core'
import DashStyle from './DashStyle'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import CustomError from '../../component/CustomError/CustomError'
import CustomLoading from '../../component/CustomLoading/CustomLoading'

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <DisplayUsers />
            </Suspense>
        </DashboardLayout>
    )
}

const DisplayUsers = () => {
    const users = useQuery(GET_USERS)
    return (
        <Fragment>
            Dashboard
            {users.error && <CustomError errorMessage={users.error.message} />}
            {users.loading && <CustomLoading />}
            {users.data.allUsers && users.data.allUsers.map(coach => (
                <div key={`userId/${coach.id}`}>
                    {coach.username}
                </div>
            ))}
        </Fragment>
    )
}

const GET_USERS = gql`
    query allUser {
        allUsers{
            id
            username
            updatedAt
        }
    }
`

export default withStyles(DashStyle)(Dashboard)