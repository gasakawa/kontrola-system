import React from 'react';
import { Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';

import FirstAccess from 'pages/FirtsAccess';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';

import Layout from 'components/Layout';
import Profile from 'pages/Profile';
import Route from './route';

const Routes = (): JSX.Element => {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact component={Login} path="/" />
          <Route component={Home} path="/home" isPrivate />
          <Route component={FirstAccess} path="/first-access" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={ResetPassword} path="/reset-password" />
          <Route component={Profile} path="/me/profile" isPrivate />
        </Switch>
      </Layout>
    </>
  );
};

export default Routes;
