import { PageNotFound } from 'pages/404';
import { IndexPage } from 'pages/index';
import { ScenarioPage } from 'pages/scenario';
import { TestDataPage } from 'pages/test-data';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routes from './routes';

export function App() {
  return (
    <Switch>
      <Route path={routes.scenarioUrl} component={ScenarioPage} />
      <Route path={routes.testDataUrl} component={TestDataPage} />
      <Route path={routes.homeUrl} exact component={IndexPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
}
