import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dashboard from '../Dashboard/Dashboard'
import Connect from '../Connect/Connect'

const RouteProvider = () => {
    const connect = useSelector(state => state.connected)
    const { connected } = connect
    console.log(connected)
    const getRoute = () => {
        if (connected) {
            return <Dashboard />
        } else {
            return <Connect />
        }
    }


    return (
        <Router>
            {getRoute()}
        </Router>
    )
}

export default RouteProvider