import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth.js';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/logga_in',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export { ProtectedRoute as default };
