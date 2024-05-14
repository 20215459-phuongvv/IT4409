import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import TableComponent from '../../components/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '~/redux/Admin/Product/Action';
import Loading from '~/components/LoadingComponent/Loading';
import * as message from '~/components/Message/Message';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 10 },
    { id: 'image', label: 'Hình ảnh', minWidth: 30 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 200, align: 'left' },
    {
        id: 'category',
        label: 'Phân loại',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'quantity',
        label: 'Số lượng',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'update',
        label: 'Cập nhật',
        minWidth: 30,
        align: 'left',
    },
];

function ProductsManagement() {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.products);
    const isLoading = productsState.loading;
    const isError = productsState.error;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    console.log('productsState', productsState);

    const rows = productsState.products.map((element, index) => ({ ...element, index: index + 1 }));

    const handleDelete = (product) => {
        console.log('delete product', product);
        dispatch(deleteProduct(product)).then(() => {
            dispatch(getAllProducts());
        });
        if (!isError) {
            message.success();
        } else {
            message.error();
        }
    };

    const handleUpdate = (index) => {
        console.log(index);
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Danh sách sản phẩm</h1>
                <TableComponent
                    columns={columns}
                    rows={rows}
                    type="product"
                    attributes={['index', 'thumbnail', 'productName', 'categoryId', 'price', 'quantityInStock']}
                    deleteButton={true}
                    updateButton={true}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            </div>
        </Loading>
    );
}

export default ProductsManagement;
