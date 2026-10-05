import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const RouteGuard = ({
  isProtected = false,
  accessToken,
  loginInfo,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isProtected) {
          return loginInfo ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/auth/login' }} />
          );
        } else {
          return loginInfo ? (
            <Redirect to={{ pathname: '/auth/login' }} />
          ) : (
            <Component {...props} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.login.accessToken,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps, null)(RouteGuard);
