import React, { useState } from 'react'
import Modal from '../CustomModal/Modal'
import ChannelStyle from './ChannelStyle'
import { withStyles } from '@material-ui/core'
import Title from '../Typography/Title'
import SmallTitle from '../Typography/SmallTitle'
import Input from '../CustomInputs/Input'
import Button from '../CustomButtons/Button'
import notify from '../Notification/Notification'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const CreateChannel = ({ openAddChannelModal, setOpenAddChannelModal, classes, history, teamId, createChannelMutation}) => {
    const [channelName, setChannelName] = useState('')
    const [channelError, setChannelError] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        createChannelMutation({ variables: { teamId, channelName } })
            .then(response => {
                const { ok, errors } = response.data.createChannel
                if (ok && !errors) {
                    notify({
                        type: 'report',
                        message: 'Channel created',
                        variant: 'contained',
                        color: 'primary'
                    })
                    setOpenAddChannelModal(false)
                } else {
                    if (errors && errors.length) {
                        const ChannelErrorMessage = errors[errors.findIndex(x => x.path === 'name')]
                        setChannelError(ChannelErrorMessage ? ChannelErrorMessage.message : '')
                    }
                    notify({
                        type: 'report',
                        message: 'Channel creation failed',
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
            open={openAddChannelModal}
            onClose={() => setOpenAddChannelModal(false)}
        >
            <div className={classes.container}>
                <Title centered>Create your Channel</Title>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <SmallTitle>insert the name of your Channel</SmallTitle>
                    <Input onChange={e => setChannelName(e.target.value)} value={channelName} placeholder="Channel Name" />
                    <SmallTitle error>{channelError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
            </div>
        </Modal>
    )
}

export default compose(
    withStyles(ChannelStyle),
    withRouter
)(CreateChannel) 