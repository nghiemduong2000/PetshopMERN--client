import Navbar from 'components/Navbar';
import SidebarUser from 'components/SidebarUser';
import Profile from 'Pages/User/comppnents/Profile';
import Purchase from 'Pages/User/comppnents/Purchase';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from 'reactstrap';
import ChangePassword from './comppnents/ChangePassword';
import './style.scss';

const User = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const match = useRouteMatch();

  return (
    <Fragment>
      {isAuthenticated ? (
        <div className='user'>
          <Navbar />
          <Container className='user__body'>
            <SidebarUser rest={props} />
            <Switch>
              <Route path={`${match.url}/purchase`} component={Purchase} />
              <Route
                path={`${match.url}/account/profile`}
                component={Profile}
              />
              <Route
                path={`${match.url}/account/password`}
                component={ChangePassword}
              />
            </Switch>
          </Container>
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </Fragment>
  );
};

User.propTypes = {};

export default User;
