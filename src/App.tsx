import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from 'routes';
import GlobalStyles from 'styles/global';
import AppProvider from 'hooks';

import { injectStyle } from 'react-toastify/dist/inject-style';
import 'react-toastify/dist/ReactToastify.min.css';

const App = (): JSX.Element => {
  injectStyle();
  return (
    <Router>
      <AppProvider>
        <ToastContainer />
        <Routes />
      </AppProvider>
      <GlobalStyles />
    </Router>
  );
};

export default App;
