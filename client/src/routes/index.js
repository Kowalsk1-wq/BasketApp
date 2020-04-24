import React from 'react';
import {
  Switch, 
  Route, 
  Redirect,
} from 'react-router-dom';

import { isAuthenticated } from '../services/auth';

/*
* Pages & Components
*/
import Login from '../pages/Login/index';
import SignUp from '../pages/SignUp/index';
import Activate from '../pages/Activate/index';
import PNF from '../pages/PageNotFound/index';
import Dash from '../pages/Dash/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={() => <></>} />
        <Route exact path='/signin' component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path='/activate' component={Activate} />
        <PrivateRoute exact path="/app" component={Dash} />
        <PrivateRoute exact path="/me" component={() => <></>} />
        <Route path="*" component={PNF} />
      </Switch>
    </>
  );
};
