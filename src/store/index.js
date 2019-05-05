/* eslint global-require: "off" */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

const middlewareConfig = applyMiddleware(thunk);

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools(middlewareConfig));

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
