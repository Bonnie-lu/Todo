import * as  React from 'react'
import { Route, Switch } from 'react-router-dom'
import Todo from "../pages/todo"
import Hello from "../components/Hello"
class RootRoute extends React.Component {
  render() {
    return (
        <Switch>
               <Route exact={true} path='/' component={Hello}/>
               <Route path="/list" component={Todo} />
               <Route path="/hello" component={Hello} /> 
        </Switch>
    )
  }
}
export default RootRoute
