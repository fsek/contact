import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import LandingPage from '../components/landingPage';
import SignInPage from '../components/sign_in';
import AdminPage from '../components/AdminPage';
import UserMessages from '../components/UserMessages';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/logga_in' component={SignInPage} />
      <Route exact path='/admin' component={AdminPage} />
      <Route exact path='/meddelanden' component={UserMessages} />
      <Redirect to='/' />
    </Switch>
  </Router>
);

export default App;
