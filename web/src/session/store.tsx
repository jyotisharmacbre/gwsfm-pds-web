import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer, { IApplicationState } from './reducers/RootReducer';

const middlewares: any[] = [];

middlewares.push(thunk);

if (process.env.NODE_ENV === `development`) {

  middlewares.push(logger);
}

export default function configureStore(): Store<IApplicationState> {
  return createStore(
    rootReducer,
    undefined,
    applyMiddleware(...middlewares)
  );
}