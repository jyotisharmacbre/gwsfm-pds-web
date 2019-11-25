import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { IState } from './state';
const middlewares: any[] = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares)
);
export { store };