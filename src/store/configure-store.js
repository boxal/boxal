import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import persistState from 'redux-localstorage';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from './logger';
import rootReducer from '../reducers';

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = compose(
    applyMiddleware(..._getMiddleware(), sagaMiddleware),
    ..._getEnhancers()
  )(createStore)(rootReducer, initialState);

  _enableHotLoader(store);
  return { ...store, runSaga: sagaMiddleware.run };
}

function _getMiddleware() {
  const middleware = [
    routerMiddleware(browserHistory),
  ];

  if (__DEV__) {
    return [...middleware, logger];
  }

  return middleware;
}

function _getEnhancers() {
  const enhancers = [
    persistState('session', _getStorageConfig()),
  ];

  if (__DEV__ && window.devToolsExtension) {
    return [...enhancers, window.devToolsExtension() ];
  }

  return enhancers;
}

function _enableHotLoader(store) {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

function _getStorageConfig() {
  return {
    key: 'boxal',
    serialize: (store) => {
      return store && store.session ?
        JSON.stringify(store.session.toJS()) : store;
    },
    deserialize: (state) => ({
      session: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  };
}

export default configureStore;
