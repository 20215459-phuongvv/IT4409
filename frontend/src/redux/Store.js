import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './Auth/Reducer';
import messageReducer from './Message/Reducer';
import loadingReducer from './Loading/Reducer';
import productReducer from './Admin/Product/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    message: messageReducer,
    loading: loadingReducer,
    products: productReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
