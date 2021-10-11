import React from 'react';
import { RouteProps as ReactDomRouteProps, Route as ReactDomRoute, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/auth';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Router = ({ isPrivate = false, component: Component, ...rest }: RouteProps): JSX.Element => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/home',
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
