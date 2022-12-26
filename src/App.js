import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </>
)

export default App
