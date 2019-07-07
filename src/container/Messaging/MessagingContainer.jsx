import React, { Suspense, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import gql from 'graphql-tag'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import MessagingForm from './MessagingForm'
import MessagingView from './MessagingView'
import CustomLoading from '../../component/CustomLoading/CustomLoading'
import CustomError from '../../component/CustomError/CustomError'

const Messaging = (props) => (
    <Suspense fallback={<CustomLoading />}>
        <Container {...props} />
    </Suspense>
)

const Container = ({ classes, channelId }) => {
    const [ messages, setMessages ] = useState([])

    const { data, error, loading } = useQuery(GET_MESSAGES, { variables: { channelId } })
    const createMessage = useMutation(CREATE_MESSAGE)
    useSubscription(MESSAGE_ADDED, {
        variables: { channelId },
        onSubscriptionData: ({ client, subscriptionData }) => {
            if(subscriptionData){
                setMessages([
                    ...messages,
                    {
                        ...subscriptionData.data.messageAdded,
                        createdAt: {
                            timestamp: Date.now()
                        }
                    }
                ])
            }
        }
    })

    useEffect(()=> {
        if (data && data.getMessages && !!data.getMessages.length) {
            setMessages(data.getMessages)
        }
    }, [data])

    return (
        <div>
            {error && <CustomError errorMessage={error.message} />}
            {loading && <CustomLoading />}
            <MessagingView
                messages={messages}
            />
            <MessagingForm 
                channelId={channelId}
                createMessage={createMessage}
            />
        </div>
    )
}

const GET_MESSAGES = gql`  
    query getMessages($channelId: Int!) {
        getMessages(channelId: $channelId) {
            id
            text
            createdAt {
                timestamp
            }
            user {
                id
                username
            }
        }
    }
`

const CREATE_MESSAGE = gql`  
    mutation createMessage($channelId: Int!, $text: String!) {
        createMessage(channelId: $channelId, text: $text)
    }
`

const MESSAGE_ADDED = gql`
    subscription messageAdded($channelId: Int!) {
        messageAdded(channelId: $channelId) {
            id
            text
            user {
                id
                username
            }
        }
    }
`

export default withStyles(MessagingStyle)(Messaging)