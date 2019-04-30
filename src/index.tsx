import * as React from 'react'
import { render } from 'react-dom'
import { Router, Switch, Redirect } from "react-router"
import { Route } from 'react-router-dom'
import { createBrowserHistory } from "history"

import NotFound from './components/NotFound'
import Flow from './containers/Flow'

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

const Index = () => (<>INDEX CHAN EDSU</>)

const history = createBrowserHistory()
render((
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Flow} />
      <PrivateRoute path="/pospospo" component={Index} />
      <Route component={NotFound} />
    </Switch>
  </Router>
), document.getElementById('app'))
