import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

import IconStyle from './iconStyle'

function RegularIcon({ ...props }) {
  const {
    classes,
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    centered,
    icon,
    big,
    white,
    ...rest
  } = props
  const btnClasses = classNames({
    [classes.Icon]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [classes.icon]: icon,
    [classes.big]: big,
    [classes.whiteText]: white,
    [className]: className,
  })
  return ( 
    <IconButton {...rest} classes={muiClasses} className={btnClasses} style={ centered ? { margin: 'auto', display: 'block'} : {}}>
      {children}
    </IconButton>
  )
}

RegularIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'dark',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'twitter',
    'facebook',
    'google',
    'linkedin',
    'pinterest',
    'youtube',
    'tumblr',
    'github',
    'behance',
    'dribbble',
    'reddit',
    'transparent',
    'unselect',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  icon: PropTypes.bool,
  big: PropTypes.bool,
  white: PropTypes.bool,
}

export default withStyles(IconStyle)(RegularIcon)
