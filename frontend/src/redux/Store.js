import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './Auth/Reducer';
import messageReducer from './Message/Reducer';
import loadingReducer from './Loading/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    message: messageReducer,
    loading: loadingReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
