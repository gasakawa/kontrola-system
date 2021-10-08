import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';

import Route from './route';

const Routes = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="" />
      </Switch>
    </>
  );
};

export default Routes;
