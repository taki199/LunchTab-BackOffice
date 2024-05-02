import React from 'react';
import { Navigate } from 'react-router-dom';

import { Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Navigate to='/login' />
  )} />
);

export default ProtectedRoute;
