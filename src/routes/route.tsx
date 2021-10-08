import React from 'react';
import { RouteProps as ReactDomRouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Router = ({ isPrivate = false, component: Component, ...rest }: RouteProps): JSX.Element => {
  //   const user = undefined;
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === false ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default Router;
