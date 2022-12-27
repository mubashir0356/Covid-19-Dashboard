import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'

import SpecificState from './components/SpecificState'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/state/:stateCode" component={SpecificState} />
    </Switch>
  </>
)

export default App
