import React, { useState } from 'react'
import Modal from '../CustomModal/Modal'
import DirectMessageStyle from './DirectMessageStyle'
import { withStyles } from '@material-ui/core'
import Title from '../Typography/Title'
import SmallTitle from '../Typography/SmallTitle'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import DownShiftSelectUser from './DownShiftSelectUser'

const InviteUserToDirectMessage = ({ openAddDirectMessageModal, setOpenAddDirectMessageModal, classes, history, teamId, createUserInvitelMutation}) => {
    return (
        <Modal
            open={openAddDirectMessageModal}
            onClose={() => setOpenAddDirectMessageModal(false)}
        >
            <div className={classes.container}>
                <Title centered>Invite a user for direct messaging</Title>
                <div className={classes.form}>
                    <SmallTitle>Select user for send messages</SmallTitle>
                    <DownShiftSelectUser 
                        teamId={teamId} 
                        setOpenAddDirectMessageModal={setOpenAddDirectMessageModal} 
                    />
                </div>
            </div>
        </Modal>
    )
}

export default compose(
    withStyles(DirectMessageStyle),
    withRouter
)(InviteUserToDirectMessage) 