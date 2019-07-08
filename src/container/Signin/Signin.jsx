import React, { useState } from 'react'

import gql from 'graphql-tag'
import { compose } from 'recompose'
import { withRouter, NavLink } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import { withStyles } from '@material-ui/core'

import SigninStyle from './SigninStyle'
import Text from '../../component/Typography/Text'
import Title from '../../component/Typography/Title'
import Input from '../../component/CustomInputs/Input'
import ConnectLayout from '../../layouts/Connect/Connect'
import Button from '../../component/CustomButtons/Button'
import SmallTitle from '../../component/Typography/SmallTitle'
import notify from '../../component/Notification/Notification'

const Signin = ({ classes, history }) => {
    const [ username, setUsername ] = useState('')
    const [ usernameError, setUsernameError ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')

    const createUser = useMutation(CREATE_USER) 

    const handleSubmit = e => {
        e.preventDefault()
        createUser({ variables: { username, email, password }})
        .then(response => {
            const { ok, errors } = response.data.register
            if (ok && !errors){
                notify({
                    type: 'report', 
                    message: 'Registration success', 
                    variant: 'contained', 
                    color: 'primary'
                })
                history.push('/connect/login')
            }else{
                if(errors && errors.length){
                    const usernameErrorMessage = errors[errors.findIndex(x => x.path === 'username')]
                    const emailErrorMessage = errors[errors.findIndex(x => x.path === 'email')]
                    const passwordErrorMessage = errors[errors.findIndex(x => x.path === 'password')]
                    setUsernameError(usernameErrorMessage ? usernameErrorMessage.message : '')
                    setEmailError(emailErrorMessage ? emailErrorMessage.message : '')
                    setPasswordError(passwordErrorMessage ? passwordErrorMessage.message : '')
                }
                notify({
                    type: 'report', 
                    message: 'Registration failed', 
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
        <ConnectLayout>
            <div className={classes.container}>
                <Title centered><b>Nouveau</b> Compte</Title>
                <form className={classes.form} onSubmit={(e)=>handleSubmit(e)}>
                    <SmallTitle>Inscrivez vous avec votre email professionnel.</SmallTitle>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" autoComplete="username" />
                    <SmallTitle error>{usernameError}</SmallTitle>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Saisissez votre e-mail professionnel" autoComplete="email"/>
                    <SmallTitle error>{emailError}</SmallTitle>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    <SmallTitle error>{passwordError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
                <div>
                    <Text>Si vous êtes déjà inscrit <NavLink className="link" to="/connect/login">Connectez-vous Ici</NavLink>.</Text>
                </div>
            </div>
        </ConnectLayout>
    )
}

const CREATE_USER = gql`
    mutation register($username: String!, $email: String!, $password: String!){
        register(username: $username, email: $email, password: $password){
            user {
                username
            }
            errors {
                path
                message
            }
            ok
        }
    }
`

export default compose(
    withStyles(SigninStyle),
    withRouter
)(Signin)