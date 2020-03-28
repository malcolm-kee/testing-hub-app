import { PageNotFound } from 'pages/404';
import { IndexPage } from 'pages/index';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routes from './routes';

export function App() {
  return (
    <Switch>
      <Route path={routes.homeUrl} exact component={IndexPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
