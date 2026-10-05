import { useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthLayout from './layout/Auth/index';
import Admin from './layout/Admin/index';
import RouteGuard from './RouterGuard/index';
import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import ForegroundNotification from './pages/ForegroundNotification';
import { onMessageListener } from './firebase';
import { history } from './reduxStore/store';

import { ThemeContext } from './contexts/theme-context';

function App(props) {
  const { loginInfo } = props;

  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  onMessageListener()
  return (
    <>
      <ForegroundNotification />
      <Toaster position="top-center" />
      <Switch>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={`theme-${theme}`}>

            <RouteGuard
              path="/auth"
              component={(props) => <AuthLayout {...props} />}
            />
            {loginInfo && <RouteGuard
              path="/admin"
              component={(props) => <Admin {...props} />}
              isProtected
            />}
            {(!loginInfo && history.location.pathname == '/' || !loginInfo) && <Redirect to="/auth/login" />}
            {(loginInfo && history.location.pathname == '/') && <Redirect to="/admin/home" />}
          </div>
        </ThemeContext.Provider>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.login.accessToken,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps, null)(App);
