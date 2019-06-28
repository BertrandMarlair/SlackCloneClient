import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'

import CustomInputStyle from './CustomInputStyle'

function Select({ ...props }) {
    const {
        children,
        muiClasses,
        classes,
        className,
        centered,
        ...rest
    } = props
    const btnClasses = classNames({
        [classes.select]: true,
        [className]: className,
    })
    return (
        <select {...rest} classes={muiClasses} className={btnClasses} style={centered ? { margin: 'auto', display: 'block' } : {}}>
            {children}
        </select>
    )
}

Select.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    muiClasses: PropTypes.object,
}

export default withStyles(CustomInputStyle)(Select)
