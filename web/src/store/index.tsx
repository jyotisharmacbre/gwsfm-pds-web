import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import allReducer from './reducers';

const store = applyMiddleware(thunk)(createStore)(allReducer);
export { store };
