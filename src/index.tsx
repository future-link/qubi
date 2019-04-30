import * as React from 'react'
import { render } from 'react-dom'
import { Router, Switch, Redirect } from "react-router"
import { Route, Link } from 'react-router-dom'
import { createBrowserHistory } from "history"

import Config from './config'

import NotFound from './components/NotFound'
import Home from './containers/Home'

const auth = {
  token: null,
}
function PrivateRoute ({ component: Component, ...props }) {
  return (
    <Route {...props} render={props =>
      auth.token
        ? (<Component {...props} />)
        : (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />)
    }/>)
}

const Login = ({ location }) => {
  const next = location.state && 'from' in location.state ? location.state.from.path : (new URLSearchParams(location.search)).get('next')
  const redirectURI = new URL(window.location.href)
  redirectURI.pathname = '/callback'
  redirectURI.search = ''
  if (next) redirectURI.searchParams.set('next', next)

  const authURL = Config.pauth + `?redirect_url=` + encodeURI(redirectURI.href)

  return (<button onClick={() => window.location.replace(authURL)}>Login</button>)
}
const Callback = ({ location }) => {
  const next = (new URLSearchParams(location.search)).get('next')
  const token = (new URLSearchParams(location.hash.substr(1))).get('token')
  if (!token) {
    return (<>
      <h1>あほしね</h1>
      <Link to={`/login?next=${encodeURI(next)}`} />
    </>)
  }
  auth.token = token  
  return (<Redirect to={{ pathname: next || '/' }} />)
}

const history = createBrowserHistory()
render((
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/callback" component={Callback} />
      <Route component={NotFound} />
    </Switch>
  </Router>
), document.getElementById('app'))
