import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Redirect to='/products' /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
