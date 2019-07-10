import React, { Suspense, useRef, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { withStyles } from '@material-ui/core'
import DashStyle from './DashStyle'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'
import CustomError from '../../component/CustomError/CustomError'
import CustomLoading from '../../component/CustomLoading/CustomLoading'
import GridLayout from 'react-grid-layout'
import Paper from '@material-ui/core/Paper'
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const Dashboard = props => {
    return (
        <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <DisplayUsers {...props} />
            </Suspense>
        </DashboardLayout>
    )
}

const DisplayUsers = ({classes}) => {
    const users = useQuery(GET_USERS)
    const dashboardLayoutEL = useRef(null);
    const [ dashboardSise,  setDashboardSize ] = useState(0)

    useEffect(() => {
        setDashboardSize(dashboardLayoutEL.current.clientWidth)
        window.addEventListener('resize', resizeWindow)
        return () => {
            window.removeEventListener('resize', resizeWindow)
        };
    }, [])

    const resizeWindow = () => {
        setDashboardSize(dashboardLayoutEL.current.clientWidth)
    }

    return (
        <div ref={dashboardLayoutEL}>
            {users.error && <CustomError errorMessage={users.error.message} />}
            {users.loading && <CustomLoading />}
            <GridLayout 
                className="layout" 
                cols={12} 
                rowHeight={30} 
                width={dashboardSise} 
                compactType={null}
            >
                {users.data.allUsers && users.data.allUsers.map(coach => (
                    <Paper className={classes.girdLayoutItem} key={`userId/${coach.id}`} data-grid={{ x: 0, y: 0, w: 5, h: 3}}>
                        {coach.username}
                    </Paper>
                ))}
            </GridLayout>
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

export default withStyles(DashStyle)(Dashboard)