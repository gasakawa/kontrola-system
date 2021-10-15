import React from 'react';
import { Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';

import FirstAccess from 'pages/FirtsAccess';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Route from './route';

const Routes = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="/" />
        <Route exact component={Home} path="/home" isPrivate />
        <Route exact component={FirstAccess} path="/first-access" />
        <Route exact component={ForgotPassword} path="/forgot-password" />
        <Route exact component={ResetPassword} path="/reset-password" />
      </Switch>
    </>
  );
};

export default Routes;
