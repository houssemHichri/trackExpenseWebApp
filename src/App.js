import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components';
import routes from './../shared/routes';

const App = () => (
  <div>
    <NavBar />
    <Switch>
      {routes.map(({
        path,
        exact,
        Component,
      }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => (<Component {...props} />)}
        />
      ))}
      <Route render={() => (<div>not found</div>)} />
    </Switch>
  </div>
);

export default App;
