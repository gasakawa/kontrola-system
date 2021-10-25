import React from 'react';
import { Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';

import FirstAccess from 'pages/FirtsAccess';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import { useAuth } from 'hooks/auth';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import Route from './route';

const Routes = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <>
      {!!user && (
        <>
          <Sidebar />
          <Header />
        </>
      )}
      <Switch>
        <Route exact component={Login} path="/" />
        <Route component={Home} path="/home" isPrivate />
        <Route component={FirstAccess} path="/first-access" />
        <Route component={ForgotPassword} path="/forgot-password" />
        <Route component={ResetPassword} path="/reset-password" />
      </Switch>
    </>
  );
};

export default Routes;
