import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Vouchers.module.scss';
import TableComponent from '../../components/TableComponent';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'image', label: 'Hình ảnh', minWidth: 20 },
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
];

function createData(index, image, name, category, price, quantity) {
    return { index, image, name, category, price, quantity };
}

let data = [
    createData(
        1,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        2,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        3,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        4,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        5,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        6,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        7,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        8,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        9,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        10,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        11,
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
];

const rows = data.map((element, index) => ({ ...element, index: index + 1 }));

console.log(rows);

function ProductsManagement() {
    const handleDelete = (index) => {
        alert(`delete product ${index}`);
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh sách sản phẩm</h1>
            <TableComponent
                columns={columns}
                rows={rows}
                type="product"
                attributes={['index', 'image', 'name', 'category', 'price', 'quantity']}
                deleteButton={true}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default ProductsManagement;
