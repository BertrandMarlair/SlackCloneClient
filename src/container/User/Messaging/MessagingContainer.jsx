import React, { Suspense, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import gql from 'graphql-tag'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'
import MessagingForm from './MessagingForm'
import MessagingView from './MessagingView'
import CustomLoading from '../../../component/CustomLoading/CustomLoading'
import CustomError from '../../../component/CustomError/CustomError'

const Messaging = (props) => (
    <Suspense fallback={<CustomLoading />}>
        <Container {...props} />
    </Suspense>
)

const Container = ({ classes, userId, teamId }) => {
    const [ messages, setMessages ] = useState([])

    const { data, error, loading } = useQuery(GET_DIRECT_MESSAGES, { variables: { teamId, ortherUser: userId } })
    console.log(data)
    const createMessage = useMutation(CREATE_DIRECT_MESSAGE)
    // useSubscription(MESSAGE_ADDED, {
    //     variables: { receiverId: userId },
    //     onSubscriptionData: ({ client, subscriptionData }) => {
    //         if(subscriptionData){
    //             setMessages([
    //                 {
    //                     ...subscriptionData.data.messageAdded,
    //                     createdAt: {
    //                         timestamp: Date.now()
    //                     }
    //                 },
    //                 ...messages
    //             ])
    //         }
    //     }
    // })

    useEffect(()=> {
        if (data && data.getMessages) {
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
                receiverId={userId}
                createMessage={createMessage}
            />
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
    mutation createDirectMessage($receiverId: Int!, $text: String!) {
        createDirectMessage(receiverId: $receiverId, text: $text)
    }
`

// const MESSAGE_ADDED = gql`
//     subscription messageAdded($channelId: Int!) {
//         messageAdded(channelId: $channelId) {
//             id
//             text
//             user {
//                 id
//                 username
//             }
//         }
//     }
// `

export default withStyles(MessagingStyle)(Messaging)