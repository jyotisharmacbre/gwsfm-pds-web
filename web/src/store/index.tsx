import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import allReducer from './reducers';

const middleware = applyMiddleware(thunk);
const store = createStore(allReducer, middleware);
export { store };
