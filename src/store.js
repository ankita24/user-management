import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  users: userReducer
});

export default function configureStore(initialState) {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}
