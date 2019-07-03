import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const MessagesList = () => {
    return (
        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Messages
                </ListSubheader>
            }
        >
            {['coucou', 'test'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    )
}

export default MessagesList