import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './components/landingPage';
import TestPage from './components/test';
import SignInPage from './components/sign_in';

const App = (props) => (
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/test' component={TestPage} />
      <Route exact path='/logga_in' component={SignInPage} />
      <Redirect to='/' />
    </Switch>
  </Router>
)

export default App;
