import React, { useState } from 'react'
import Input from '../../../component/CustomInputs/Input'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import SmallTitle from '../../../component/Typography/SmallTitle'
import notify from '../../../component/Notification/Notification'
import gql from 'graphql-tag'
import findIndex from 'lodash/findIndex';

const MessagingForm = ({ classes, receiverId, teamId, createDirectMessage, userDirectData }) => {

    const [message, setMessage] = useState('')
    const [messageError, setMessageError] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        createDirectMessage({ 
            variables: { receiverId, text: message, teamId } ,
            optimisticResponse: true,
            update: (cache, response) => { 
                console.log(response); /* cache.writeData(...) */ 
                const data = cache.readQuery({ query: CURRENT_USER})
                const teamIdx2 = findIndex(data.getCurrentUser.teams, ['id', teamId]);
                const notAlreadyThere = data.getCurrentUser.teams[teamIdx2].directMessageMembers.every(member => member.id !== parseInt(receiverId, 10));
                if (notAlreadyThere) {
                    data.getCurrentUser.teams[teamIdx2].directMessageMembers.push({
                        __typename: 'User',
                        id: receiverId,
                        username: userDirectData.username,
                    });
                    cache.writeQuery({ query: CURRENT_USER, data });
                }
            }
        })
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

const CURRENT_USER = gql`  
    query getCurrentUser {
        getCurrentUser {
            id
            username
            teams {
                id
                name
                admin
                channels{
                    id
                    name
                    public
                }
                directMessageMembers {
                    id
                    username
                }
            }
        }
    }
`

export default withStyles(MessagingStyle)(MessagingForm)