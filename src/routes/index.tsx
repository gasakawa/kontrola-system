import React from 'react';
import { Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import UserConfirm from 'pages/UserConfirm';

import Route from './route';

const Routes = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="/" />
        <Route exact component={Home} path="/home" isPrivate />
        <Route exact component={UserConfirm} path="/user/confirm/:email" />
      </Switch>
    </>
  );
};

export default Routes;
