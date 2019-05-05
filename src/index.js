/* eslint global-require: "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.css';
import AppContainer from './containers/app-container';
import * as serviceWorker from './serviceWorker';

import configureStore from './store';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('./containers/app-container', () => {
    const NextApp = require('./containers/app-container').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
