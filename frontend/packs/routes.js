import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './components/landingPage';
import TestPage from './components/test';
import SignInPage from './components/sign_in';
import AdminPage from './components/AdminPage';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/test' component={TestPage} />
      <Route exact path='/logga_in' component={SignInPage} />
      // TODO: Protect this route
      <Route exact path='/admin' component={AdminPage} />
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default App;
