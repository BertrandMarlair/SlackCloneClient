import React, { Fragment } from 'react'
import Home from '../container/Home/Home'
import Headers from '../component/Header/Header'

const MainLayout = () =>(
    <Fragment>
        <Headers />
        <Home />
    </Fragment>
) 

export default MainLayout