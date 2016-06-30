import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import album from './album-links';

const rootReducer = combineReducers({
  session,
  album,
  routing: routerReducer,
});

export default rootReducer;
