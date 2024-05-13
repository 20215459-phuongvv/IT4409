import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import customerApi from '~/api/customerApi';
import TableComponent from '../../components/TableComponent';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'username', label: 'Tên đăng nhập', minWidth: 60 },
    { id: 'name', label: 'Họ và tên', minWidth: 100, align: 'left' },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'phone-number',
        label: 'Số điện thoại',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
];

function UsersManagement() {
    const [customerList, setCustomerList] = useState([]);
    const attributes = ['index', 'username', 'name', 'email', 'phone'];

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await customerApi.getAll();
            const customersWithIndex = users.map((user, index) => ({ ...user, index: index + 1 }));
            setCustomerList(customersWithIndex);
        };

        fetchUsers();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Khách hàng</h1>
            <TableComponent
                columns={columns}
                rows={customerList}
                type="customer"
                attributes={attributes}
                deleteButton={true}
            />
        </div>
    );
}

export default UsersManagement;
