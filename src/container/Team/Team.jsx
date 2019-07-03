import React, { useState } from 'react'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core'
import { useMutation } from 'react-apollo-hooks'
import TeamStyle from './TeamStyle'
import Title from '../../component/Typography/Title'
import Input from '../../component/CustomInputs/Input'
import authFailed from '../../utils/errors/authFailed'
import Button from '../../component/CustomButtons/Button'
import SmallTitle from '../../component/Typography/SmallTitle'
import notify from '../../component/Notification/Notification'
import DashboardLayout from '../../layouts/Dashboard/Dashboard'

const CreateTeam = ({ classes, history}) => {

    const [teamName, setTeamName] = useState('')
    const [ teamError, setTeamError] = useState('')
    
    const createTeam = useMutation(CREATE_TEAM) 

    const handleSubmit = e => {
        e.preventDefault()
        createTeam({ variables: { teamName } })
            .then(response => {
                const { ok, errors } = response.data.createTeam
                if (ok && !errors) {
                    notify({
                        type: 'report',
                        message: 'Team created',
                        variant: 'contained',
                        color: 'primary'
                    })
                    history.push('/')
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
                authFailed(history)
                console.log(err)
            })
    }


    return (
        <DashboardLayout>
            <div className={classes.container}>
                <Title centered>Create your team</Title>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <SmallTitle>insert the name of your team</SmallTitle>
                    <Input onChange={e => setTeamName(e.target.value)} value={teamName} placeholder="Team Name" />
                    <SmallTitle error>{teamError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
            </div>
        </DashboardLayout>
    )
}

const CREATE_TEAM = gql`
    mutation createTeam($teamName: String!){
        createTeam(name: $teamName){
            errors {
                path
                message
            }
            ok
        }
    }
`

export default withStyles(TeamStyle)(CreateTeam)