import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './Auth/Reducer';
import messageReducer from './Message/Reducer';
import loadingReducer from './Loading/Reducer';
import productReducer from './Admin/Product/Reducer';
import categoryReducer from './Admin/Category/Reducer';
import voucherReducer from './Admin/Voucher/Reducer';
import userReducer from './Admin/User/Reducer';
import cartReducer from './Customers/Cart/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    message: messageReducer,
    loading: loadingReducer,
    products: productReducer,
    categories: categoryReducer,
    vouchers: voucherReducer,
    users: userReducer,
    carts: cartReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
