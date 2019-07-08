import React, { useState } from 'react'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core'
import { useMutation } from 'react-apollo-hooks'
import TeamStyle from './TeamStyle'
import Title from '../../component/Typography/Title'
import Input from '../../component/CustomInputs/Input'
import Button from '../../component/CustomButtons/Button'
import SmallTitle from '../../component/Typography/SmallTitle'
import notify from '../../component/Notification/Notification'
import PrivateLayout from '../../layouts/Public/Public'

const CreateTeam = ({ classes, history}) => {

    const [teamName, setTeamName] = useState('')
    const [ teamError, setTeamError] = useState('')
    
    const createTeam = useMutation(CREATE_TEAM) 

    const handleSubmit = e => {
        e.preventDefault()
        createTeam({ variables: { teamName } })
            .then(response => {
                const { ok, errors, team } = response.data.createTeam
                if (ok && !errors) {
                    notify({
                        type: 'report',
                        message: 'Team created',
                        variant: 'contained',
                        color: 'primary'
                    })
                    setTimeout(()=>{
                        history.push(`/app/view-team/${team.id}`)
                    }, 1000)
                } else {
                    if (errors && errors.length) {
                        const teamErrorMessage = errors[errors.findIndex(x => x.path === 'name')]
                        setTeamError(teamErrorMessage ? teamErrorMessage.message : '')
                    }
                    notify({
                        type: 'report',
                        message: 'Team creation failed',
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
        <PrivateLayout>
            <div className={classes.container}>
                <Title centered>Create your team</Title>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <SmallTitle>insert the name of your team</SmallTitle>
                    <Input onChange={e => setTeamName(e.target.value)} value={teamName} placeholder="Team Name" />
                    <SmallTitle error>{teamError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
            </div>
        </PrivateLayout>
    )
}

const CREATE_TEAM = gql`
    mutation createTeam($teamName: String!){
        createTeam(name: $teamName){
            team {
                id
            }
            errors {
                path
                message
            }
            ok
        }
    }
`

export default withStyles(TeamStyle)(CreateTeam)