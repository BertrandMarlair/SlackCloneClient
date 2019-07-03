import React, { Fragment } from 'react'
import Headers from '../../component/Header/Header'

const Public = (props) =>(
    <Fragment>
        <Headers />
        {props.children}
    </Fragment>
) 

export default Public