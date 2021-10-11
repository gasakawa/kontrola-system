import React from 'react';
import { useAuth } from 'hooks/auth';

const Home = (): JSX.Element => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <a href="#/" onClick={signOut}>
        Logout
      </a>
    </div>
  );
};

export default Home;
