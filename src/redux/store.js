import combinedReducers from './mainReducer';
import {createStore, applyMiddleware, compose} from 'redux';
// redux-saga's "import" export condition points at a proxy that double-applies
// Babel's default interop, yielding undefined. require() keeps Metro on the CJS entry.
const createSagaMiddleware = require('redux-saga').default;
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mainSaga} from './mainSaga';
const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
};

const persistedReducer = persistCombineReducers(
  persistConfig,
  combinedReducers,
);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(mainSaga);

export {store};
