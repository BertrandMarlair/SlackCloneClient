import React from 'react'
import { Button, withStyles } from '@material-ui/core'
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  BusinessCenter as DeliveredIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from '@material-ui/icons'
import classnames from 'classnames'
import tinycolor from 'tinycolor2'
import { toast } from 'react-toastify'
import Text from '../Typography/Text'
import NotificationStyle from './NotificationStyle'

const typesIcons = {
  'e-commerce': <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  delivered: <DeliveredIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
}

const getIconByType = (type = 'offer') => typesIcons[type]

const Notification = ({ classes, theme, variant, ...props }) => {
  const icon = getIconByType(props.type)
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon
    },
    style: {
      color: variant !== 'contained' && theme.palette[props.color] && theme.palette[props.color].main
    }
  })

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === 'contained',
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === 'contained' &&
          theme.palette[props.color] &&
          theme.palette[props.color].main
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === 'contained',
          [classes.notificationIconContainerRounded]: variant === 'rounded',
        }
        )}
        style={{
          backgroundColor: variant === 'rounded' &&
          theme.palette[props.color] &&
          tinycolor(theme.palette[props.color].main).setAlpha(0.15).toRgbString()
        }}
      >{iconWithStyles}</div>
      <div className={classes.messageContainer}>
        <Text
          white
          small
          className={classnames({
            [classes.containedTypography]: variant === 'contained'
          })}
          variant={props.typographyVariant}
          size={variant !== 'contained' && !props.typographyVariant && 'md'}
        >
          {props.message}
        </Text>
        {props.extraButton && props.extraButtonClick && (<Button onClick={props.extraButtonClick} disableRipple className={classes.extraButton}>{props.extraButton}</Button>)}
      </div>
    </div>
  )
}

const Wrapper = withStyles(NotificationStyle, { withTheme: true })(Notification)

const notify = ({ type, message, variant, color }) => toast(<Wrapper type={type} message={message} variant={variant} color={color} />)

export default notify