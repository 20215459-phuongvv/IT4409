import axiosCLient from './axiosClient';

const productApi = {
    getAll() {
        const url = '/products';
        return axiosCLient.get(url);
    },
};

export default productApi;
