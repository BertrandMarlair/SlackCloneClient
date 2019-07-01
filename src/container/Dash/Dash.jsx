import React, { Suspense, useState } from 'react'
import GridLayout from 'react-grid-layout'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'
import Switch from '@material-ui/core/Switch'
import GridDiv from '../../component/WidjetTypes/GriddedDiv'

import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'

const Dashboard = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DisplayUsers />
        </Suspense>
    )
}

const DisplayUsers = () => {
    const [layout, setLayout] = useState(
        [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 1, h: 2, static: true},
            {i: 'c', x: 2, y: 0, w: 1, h: 2, static: true}
        ]
    )

    const [switchState, setSwitchState] = useState(false)

    const gridController = () => {

        setLayout(layout.map(
            el => ({...el, static: !el.static})
        ))

        setSwitchState(!switchState)
    }

    const onLayoutChange = passed_layout => {
        setLayout(passed_layout)
    }
    
    const users = useQuery(GET_USERS)
    console.log(users)
    return (
        <div style={{paddingLeft: '25px'}}>
            <p>Dashboard</p>
            <div>
                edit dashboard
                <Switch checked={switchState} onChange={gridController} value={switchState}/>
            </div>

            <GridLayout className="layout" 
            layout={layout} 
            cols={3} 
            rowHeight={100} 
            width={1600}
            onLayoutChange={onLayoutChange}>
                {layout.map(
                    el => (
                        <div key={el.i} style={{boxShadow: '5px 5px 5px teal', border: '1px solid black'}}>
                            <GridDiv/>
                        </div>
                    )
                )}
            </GridLayout>

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