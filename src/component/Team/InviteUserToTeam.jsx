import React, { useState } from 'react'
import Modal from '../CustomModal/Modal'
import TeamStyle from './TeamStyle'
import { withStyles } from '@material-ui/core'
import Title from '../Typography/Title'
import SmallTitle from '../Typography/SmallTitle'
import Input from '../CustomInputs/Input'
import Button from '../CustomButtons/Button'
import notify from '../Notification/Notification'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const InviteUserToTeam = ({ openInviteUserToTeamModal, setOpenInviteUserToTeamModal, classes, history, teamId, createUserInvitelMutation}) => {
    const [emailUserInvite, setEmailUserInvite] = useState('')
    const [userInviteError, setUserInviteError] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        createUserInvitelMutation({ variables: { email: emailUserInvite, teamId } })
            .then(response => {
                const { ok, errors } = response.data.addTeamMember
                if (ok && !errors) {
                    notify({
                        type: 'report',
                        message: 'User invited',
                        variant: 'contained',
                        color: 'primary'
                    })
                    setOpenInviteUserToTeamModal(false)
                } else {
                    if (errors && errors.length) {
                        const userInviteErrorMessage = errors[errors.findIndex(x => x.path === 'email')]
                        setUserInviteError(userInviteErrorMessage ? userInviteErrorMessage.message : '')
                    }
                    notify({
                        type: 'report',
                        message: 'User invite failed',
                        variant: 'contained',
                        color: 'secondary'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Modal
            open={openInviteUserToTeamModal}
            onClose={() => setOpenInviteUserToTeamModal(false)}
        >
            <div className={classes.container}>
                <Title centered>Invite a user to your team</Title>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <SmallTitle>insert the email of the user</SmallTitle>
                    <Input onChange={e => setEmailUserInvite(e.target.value)} value={emailUserInvite} placeholder="User Name" />
                    <SmallTitle error>{userInviteError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
            </div>
        </Modal>
    )
}

export default compose(
    withStyles(TeamStyle),
    withRouter
)(InviteUserToTeam) 