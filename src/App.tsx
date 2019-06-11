import * as React from 'react'
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import './App.css'
import RootStore from "./stores/root"
import Layout from "./layout"
import { Provider } from "mobx-react"
import { Router, Route } from "react-router-dom"
import RootRoute from "./router"

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

export const rootStore = new RootStore()   // 其他地方需要用到
class App extends React.Component {
  public render() {
    return (
         <Provider {...rootStore}>
          <Layout>
            <Router history={history}>
              <Route component={RootRoute} />
            </Router>
          </Layout>
        </Provider>
 
    );
  }
}

export default App;
