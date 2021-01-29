import Navbar from 'components/Navbar';
import SidebarUser from 'components/SidebarUser';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Fragment>
            <Navbar />
            <Container className='wrapBody'>
              <SidebarUser />
              <Component {...props} />
            </Container>
          </Fragment>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;
