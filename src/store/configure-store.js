import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import persistState from 'redux-localstorage';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from './logger';
import rootReducer from '../reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import * as C from '../constants';

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
  const socket = io(C.SOCKET_IO_URL);
  const socketMiddleware = createSocketIoMiddleware(socket, C.REDUX_SOCKET_IO_PREFIX);

  const middleware = [
    routerMiddleware(browserHistory),
    socketMiddleware,
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
