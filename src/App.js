import * as React from 'react';
import { Switch } from 'react-router-dom';

import MainContainer from './containers/main-container';
import InfoContainer from './containers/info-container';
import { TestStatePageContainer } from './pages/test-state';
import { TestRunsStatusContainer } from './pages/test-runs-status';

import { CustomRoute } from './components/custom-route';

const App = () => (
  <div className="app-wrapper container">
    <Switch>
      <CustomRoute path="/test/state" component={TestStatePageContainer} />
      <CustomRoute path="/test/runs-status" component={TestRunsStatusContainer} />
      <CustomRoute path="/project/:name/type/:testType" component={InfoContainer} />
      <CustomRoute path="/" component={MainContainer} />
    </Switch>
  </div>
);

export default App;
