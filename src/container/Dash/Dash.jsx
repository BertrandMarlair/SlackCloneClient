import React, { Suspense } from 'react'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

const Dashboard = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayUsers />
        </Suspense>
    )
}

const DisplayUsers = () => {
    const users = useQuery(GET_USERS)
    console.log(users)
    return (
        <div>
            Dashboard
            {users.data.allUsers && users.data.allUsers.map(coach => (
                <div key={`userId/${coach.id}`}>
                    {coach.username}
                </div>
            ))}
        </div>
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

export default withStyles(HomeStyle)(Dashboard)