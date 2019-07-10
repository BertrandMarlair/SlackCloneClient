import React, { Suspense, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import gql from 'graphql-tag'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import MessagingForm from './MessagingForm'
import MessagingView from './MessagingView'
import CustomLoading from '../../../component/CustomLoading/CustomLoading'
import CustomError from '../../../component/CustomError/CustomError'
import Title from '../../../component/Typography/Title'

const Messaging = (props) => (
    <Suspense fallback={<CustomLoading />}>
        <Container {...props} />
    </Suspense>
)

const Container = ({ classes, userId, teamId }) => {
    const [ messages, setMessages ] = useState([])

    const userDirectMessage = useQuery(GET_USER, { variables: { id: userId }, fetchPolicy: "network-only"})
    const { data, error, loading } = useQuery(GET_DIRECT_MESSAGES, { variables: { teamId, ortherUser: userId } })

    const createDirectMessage = useMutation(CREATE_DIRECT_MESSAGE)

    const test =  useSubscription(DIRECT_MESSAGE_ADDED, {
        variables: { teamId, userId },
        onSubscriptionData: ({ client, subscriptionData }) => {
            console.log(subscriptionData)
            if(subscriptionData){
                setMessages([
                    {
                        ...subscriptionData.data.directMessageAdded,
                        createdAt: {
                            timestamp: Date.now()
                        }
                    },
                    ...messages
                ])
            }
        }
    })

    console.log(test)

    useEffect(()=> {
        if (data && data.getDirectMessage) {
            setMessages(data.getDirectMessage)
        }
    }, [data])

    console.log(userDirectMessage)
    const userDirectData = userDirectMessage.data.getUser
    console.log(userDirectData)

    if (!userDirectData) return <CustomError errorMessage={userDirectMessage.data.error} />

    return (
        <div>
            {error && <CustomError errorMessage={error.message} />}
            {loading && <CustomLoading />}
            <div className={classes.containerMessage}>
                <Title centered>{userDirectData.username}</Title>
                <div>
                    <MessagingView
                        messages={messages}
                    />
                    <MessagingForm
                        userDirectData={userDirectData}
                        receiverId={userId}
                        teamId={teamId}
                        createDirectMessage={createDirectMessage}
                    />
                </div>
            </div>
        </div>
    )
}

const GET_DIRECT_MESSAGES = gql`  
    query getDirectMessage($teamId: Int!, $ortherUser: Int!) {
        getDirectMessage(teamId: $teamId, ortherUser: $ortherUser) {
            id
            text
            createdAt {
                timestamp
            }
            sender {
                id
                username
            }
        }
    }
`

const CREATE_DIRECT_MESSAGE = gql`  
    mutation createDirectMessage($receiverId: Int!, $text: String!, $teamId: Int!) {
        createDirectMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
    }
`

const GET_USER = gql`  
    query getUser($id: Int!) {
        getUser(id: $id) {
            id
            username
        }
    }
`

const DIRECT_MESSAGE_ADDED = gql`
    subscription directMessageAdded($teamId: Int!, $userId: Int!) {
        directMessageAdded(teamId: $teamId, userId: $userId) {
            id
            text
            sender {
                id
                username
            }
        }
    }
`

export default withStyles(MessagingStyle)(Messaging)