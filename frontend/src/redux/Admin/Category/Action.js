import axios from 'axios';
import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
} from './ActionType';
import api, { API_BASE_URL } from '../../../config/api';

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CATEGORY_REQUEST });

        const { data } = await api.get(`${API_BASE_URL}/categories`);

        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const createCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        const { data } = await api.post(`${API_BASE_URL}/api/admin/categories`, category.data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${category.jwt}`,
            },
        });

        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// // export const updateProduct = (product) => async (dispatch) => {
// //   try {
// //     dispatch({ type: UPDATE_PRODUCT_REQUEST });

// //     const { data } = await api.put(
// //       `${API_BASE_URL}/api/admin/products/${product.productId}`,
// //       product
// //     );

// //     dispatch({
// //       type: UPDATE_PRODUCT_SUCCESS,
// //       payload: data,
// //     });
// //   } catch (error) {
// //     dispatch({
// //       type: UPDATE_PRODUCT_FAILURE,
// //       payload:
// //         error.response && error.response.data.message
// //           ? error.response.data.message
// //           : error.message,
// //     });
// //   }
// // };

// export const deleteProduct = (data) => async (dispatch) => {
//     try {
//         dispatch({ type: DELETE_PRODUCT_REQUEST });

//         await api.delete(`/api/admin/products/${data.productId}`);

//         dispatch({
//             type: DELETE_PRODUCT_SUCCESS,
//             payload: data.productId,
//         });

//     } catch (error) {
//         dispatch({
//             type: DELETE_PRODUCT_FAILURE,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//         });
//     }
// };
