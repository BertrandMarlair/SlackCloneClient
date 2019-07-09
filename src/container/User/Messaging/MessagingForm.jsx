import React, { useState } from 'react'
import Input from '../../../component/CustomInputs/Input'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import SmallTitle from '../../../component/Typography/SmallTitle'
import notify from '../../../component/Notification/Notification'

const MessagingForm = ({ classes, receiverId, teamId, createDirectMessage }) => {

    const [message, setMessage] = useState('')
    const [messageError, setMessageError] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        createDirectMessage({ variables: { receiverId, text: message, teamId } })
            .then(response => {
                const { errors } = response.data.createDirectMessage
                if (!errors) {
                    setMessage('')
                } else {
                    if (errors && errors.length) {
                        const ErrorMessage = errors[errors.findIndex(x => x.path === 'name')]
                        setMessageError(ErrorMessage ? ErrorMessage.message : '')
                    }
                    notify({
                        type: 'report',
                        message: 'Message send failed',
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
        <form className={classes.formMessage} onSubmit={e => handleSubmit(e)}>
            <Input 
                onChange={e => setMessage(e.target.value)} 
                value={message} 
                placeholder="Message" 
            />
            <SmallTitle error>{messageError}</SmallTitle>
            <button type="submit" className={classes.hiddenButton}></button>
        </form>
    )
}

export default withStyles(MessagingStyle)(MessagingForm)