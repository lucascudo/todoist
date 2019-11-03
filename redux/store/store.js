// Imports: Dependencies
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
// Imports: Redux
import authReducer from '../reducers/authReducer';
import todoReducer from '../reducers/todoReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todoReducer'],
}

const authPersistConfig = {
  key: 'authReducer',
  storage: AsyncStorage,
  whitelist: ['password'],
  blacklist: ['loggedIn'],
}

const rootReducer = combineReducers({
  authReducer: persistReducer(authPersistConfig, authReducer),
  todoReducer: todoReducer,
})

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
  ),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};