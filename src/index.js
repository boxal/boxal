import 'babel-polyfill';
import 'whatwg-fetch';
// import SocketIO from 'socket.io-client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from './store/routes';
import configureStore from './store/configure-store';
import * as ActionCreators from './action-creators';
import rootSaga from './sagas';
// import * as C from './constants';

 // Global styles
import './styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);
store.runSaga(rootSaga);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        {getRoutes(store)}
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);

store.dispatch(ActionCreators.initialize());

// const socket = SocketIO.connect('http://localhost:3000/');
// socket.on(C.SOCKET_ACTIONS.ALBUM_IMAGE_SRCSET, ({ srcset }) => {
//   const image = document.createElement('img');
//   image.srcset = srcset;
//   document.body.appendChild(image);
// });
// function init() {
//   socket.emit(C.SOCKET_ACTIONS.SCRAPE_ALBUM_IMAGES, {
//     url: 'https://www.dropbox.com/sc/klv66uya4eidmxw/AABY2r4LvVIwSBZ2AcOrR92Wa',
//   });
// }
// window.init = init;

// Socke.on('connection', function(socket){
//   console.log('client hsa connected');
//   socket.on('chatmessage', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chatmessage', msg);
//   });
// });
