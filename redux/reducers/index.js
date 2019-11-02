// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import todoReducer from './todoReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  todoReducer: todoReducer,
});
// Exports
export default rootReducer;
