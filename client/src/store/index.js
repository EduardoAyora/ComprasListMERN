import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Products} from './products';
import { Auth } from './auth';
import {SignUp} from './signup';

const store = createStore(
  combineReducers({
      products: Products,
      auth: Auth,
      signup: SignUp
  }),
  applyMiddleware(thunk)
);

export default store;
