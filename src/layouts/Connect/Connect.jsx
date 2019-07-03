import React, { Fragment } from 'react'
import Headers from '../../component/Header/Header'

const Connect = (props) =>(
    <Fragment>
        <Headers />
        {props.children}
    </Fragment>
) 

export default Connect