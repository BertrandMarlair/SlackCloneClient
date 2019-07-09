import React from 'react'
import { withStyles } from '@material-ui/core'
import MessagingStyle from './MessagingStyle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Text from '../../../component/Typography/Text'

const MessagingView = ({ classes, messages }) => {
    if (messages && !!messages.length){
        return (
            <List className={classes.messages}>
                {messages.map(message => (
                    <div key={`message/${message.id}`}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="https://image.freepik.com/vecteurs-libre/profil-avatar-homme-icone-ronde_24640-14044.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <div className={classes.headerMessage}>
                                        {message.user.username}
                                        <Text>{new Date(message.createdAt.timestamp).toDateString()}</Text>
                                    </div>
                                }
                                secondary={message.text}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        )
    }

    return <div>No messages for the moment</div>
}

export default withStyles(MessagingStyle)(MessagingView)