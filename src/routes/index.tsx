import React from 'react';
import { Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import InitialPassword from 'pages/InitialPassword';

import Route from './route';

const Routes = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="/" />
        <Route exact component={Home} path="/home" isPrivate />
        <Route exact component={InitialPassword} path="/user/change-initial-password/:email" />
      </Switch>
    </>
  );
};

export default Routes;
