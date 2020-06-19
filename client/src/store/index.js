import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Products} from './products';
import { Auth } from './auth';

const store = createStore(
  combineReducers({
      products: Products,
      auth: Auth
  }),
  applyMiddleware(thunk)
);

export default store;
