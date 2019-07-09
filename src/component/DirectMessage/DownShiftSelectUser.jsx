import React from 'react'

import Downshift from 'downshift'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'

import { List, ListItem, ListItemText } from '@material-ui/core'

import Input from '../CustomInputs/Input'
import CustomLoading from '../CustomLoading/CustomLoading'
import CustomError from '../CustomError/CustomError'

const DownShiftSelectUser = ({ teamId, history, setOpenAddDirectMessageModal}) => {

    const { data, loading, error } = useQuery(GET_TEAM_MEMBER, { variables: { teamId } })

    if(loading) return <CustomLoading />
    if (error) return <CustomError errorMessage={error} />

    return (
        <Downshift
            onChange={selection => {
                setOpenAddDirectMessageModal(false)
                history.push(`/app/view-team/user/${teamId}/${selection.id}`)
            }}
            itemToString={item => (item ? item.value : '')}
        >
            {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                highlightedIndex,
                selectedItem,
                inputValue
            }) => (
                    <div>
                        <Input value={inputValue} type="text" {...getInputProps({ placeholder: 'Select user' })} />
                        <List {...getMenuProps()}>
                            {isOpen && inputValue
                                ? data.getTeamMembers
                                    .filter(item => !inputValue || item.username.toLowerCase().includes(inputValue.toLowerCase()))
                                    .map((item, index) => (
                                        <ListItem
                                            {...getItemProps({
                                                key: item.id,
                                                index,
                                                item,
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === item.username ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            <ListItemText primary={item.username} />
                                        </ListItem>
                                    ))
                                : null}
                        </List>
                    </div>
                )}
        </Downshift>
    )
}

const GET_TEAM_MEMBER = gql`
    query getTeamMembers($teamId: Int!){
        getTeamMembers(teamId: $teamId){
            username
            id
        }
    }
`

export default withRouter(DownShiftSelectUser)