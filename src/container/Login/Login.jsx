import React, { useState } from 'react'

import gql from 'graphql-tag'
import { compose } from 'recompose'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { useMutation } from 'react-apollo-hooks'
import { observer, useObservable } from 'mobx-react-lite'

import LoginStyle from './LoginStyle'
import Button from '../../component/CustomButtons/Button'
import SmallTitle from '../../component/Typography/SmallTitle'
import Title from '../../component/Typography/Title'
import Text from '../../component/Typography/Text'
import Input from '../../component/CustomInputs/Input'
import notify from '../../component/Notification/Notification'
import ConnectLayout from '../../layouts/Connect/Connect'

const Login = observer(({ classes, history}) => {

    const [ passwordError, setPasswordError] = useState('')
    const [ emailError, setEmailError] = useState('')

    const dispatch = useDispatch()

    const CONNECTED = payload => dispatch({ type: 'CONNECTED', payload })

    const store = useObservable({
        email: 'test',
        password: 'test',
        handleChange(type, value) {
            store[type] = value
        },
        get remainingTodos() {
            return store.todos.filter(t => !t.completed).length
        }
    })

    const { email, password, handleChange } = store
    const createUser = useMutation(LOGIN_USER) 

    const handleSubmit = e => {
        e.preventDefault()
        createUser({ variables: { email, password } })
            .then(response => {
                const { ok, errors, token, refreshToken } = response.data.login
                if (ok && !errors) {
                    localStorage.setItem('token', `Bearer ${token}`)
                    localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
                    notify({
                        type: 'report',
                        message: 'Connected',
                        variant: 'contained',
                        color: 'primary'
                    })
                    CONNECTED(true)
                    history.push('/app/dashboard')
                } else {
                    if (errors && errors.length) {
                        const emailErrorMessage = errors[errors.findIndex(x => x.path === 'email')]
                        const passwordErrorMessage = errors[errors.findIndex(x => x.path === 'password')]
                        setEmailError(emailErrorMessage ? emailErrorMessage.message : '')
                        setPasswordError(passwordErrorMessage ? passwordErrorMessage.message : '')
                    }
                    notify({
                        type: 'report',
                        message: 'Login failed',
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
                <Title centered>Connexion à votre compte</Title>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <SmallTitle>Saisissez votre e-mail professionnel</SmallTitle>
                    <Input onChange={e => handleChange('email', e.target.value)} value={email} name="email" type="email" placeholder="Exemple@company.com" autoComplete="email"/>
                    <SmallTitle error>{emailError}</SmallTitle>
                    <Input onChange={e => handleChange('password', e.target.value)} value={password} name="password" type="password" placeholder="Password" autoComplete="current-password"/>
                    <SmallTitle error>{passwordError}</SmallTitle>
                    <Button className={classes.submit} type="submit" fullWidth color="primary" round>Suivant -></Button>
                </form>
                <Text>Vous n’avez pas encore de compte ? <NavLink className="link" to="/connect/signin">S’inscriress</NavLink></Text>
            </div>
        </ConnectLayout>
    )
})

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            errors {
                path
                message
            }
            ok
            token
            refreshToken
        }
    }
`

export default compose(
    withStyles(LoginStyle),
    withRouter
)(Login)