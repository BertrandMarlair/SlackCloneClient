import React, { Suspense } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { theme } from '../../utils/theme/theme'
import configureStore from '../../store/store'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MainLayout from '../../layouts/MainLayout'
import Login from '../../layouts/Login'

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={configureStore()}>
        <Wrapper />
      </Provider>
    </Suspense>
  )
}

export default App

const Loader = () => (
  <div className="App">
    <img src={'https://i.pinimg.com/originals/f9/56/88/f95688dd1ac02f459fe016d141a67bd2.gif'} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
)

const Container = () => {
  return(
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
          <PrivateRoute path="/app" component={MainLayout} />
          <PublicRoute path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

const Wrapper = withTranslation()(Container)