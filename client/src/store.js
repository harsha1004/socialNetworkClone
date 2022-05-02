import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Chrome eklentisini rahatça kullanıp neler döndüğünü görebileceğiz.
import thunk from 'redux-thunk'; // Our middleware
import rootReducer from './reducers'; // We gonna have multiple reducers, and we gonna combine them in rootReducer

const initialState = {};

const middleware = [thunk];

const store = createStore(
  // STORE'umuzu oluşturduk.
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
