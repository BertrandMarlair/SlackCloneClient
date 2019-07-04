import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: '30px',
        outline: 'none',
        boxShadow: '0 0 2rem 0 rgba(136,152,170,.15)',
        borderRadius: '3px',
        // maxWidth: '500px',
        width: '80vw',
        maxHeight: '80vh',
        overflowY: 'scroll',
    },
    iconButton:{
        position: 'absolute',
        zIndex: '4',
        right: '5px',
        top: '5px',
    },
}))

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
}

const CustomModal = ({open, children, onClose, fullWidth, smaller}) => {
    const classes = useStyles()
    return(
        <Modal
            open={open}
            onClose={onClose}
            style={{zIndex: 1201}}
        >
            {fullWidth ?
                <div className={classes.paper} style={fullWidth?{width: '100vw',height: '100vh',maxHeight: '100vh',maxWidth: '100vw',boxSizing: 'border-box',borderRadius: 0,} : {}}>
                    <IconButton className={classes.iconButton} aria-label="Delete" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    {children}
                </div>
            :
                <div className={classes.paper} style={smaller ? {maxWidth: 500, ...getModalStyle()} : getModalStyle()}>
                    <IconButton className={classes.iconButton} aria-label="Delete" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    {children}
                </div>
            }
        </Modal>
    )
}

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    smaller: PropTypes.bool,
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default CustomModal
