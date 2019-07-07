import React, { Fragment } from 'react'
import Headers from '../../component/Header/Header'

const Connect = ({ children }) =>(
    <Fragment>
        <Headers />
        {children}
    </Fragment>
) 

export default Connect