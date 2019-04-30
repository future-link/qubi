import * as React from 'react'
import { render } from 'react-dom'
import { Router, Switch, Redirect } from "react-router"
import { Route } from 'react-router-dom'
import { createBrowserHistory } from "history"

import NotFound from './components/NotFound'
import Home from './containers/Home'

const isAuthed = false
function PrivateRoute ({ component: Component, ...props }) {
  return (<Route {...props} render={props =>
    isAuthed
      ? (<Component {...props} />)
      : (<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />)
      } />)
}

const history = createBrowserHistory()
render((
  <Router history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      {/* After auth implemented, this will be removed */}
      <Route exact path="/local" component={Home} />
      <Route exact path="/login" component={({ location }) => (<div>LOGIN from {location.state.from.pathname}</div>) } />
      <Route component={NotFound} />
    </Switch>
  </Router>
), document.getElementById('app'))
