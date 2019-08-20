import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers/RootReducer';

const middlewares: any[] = [];

middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {

  middlewares.push(logger);
}

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
}