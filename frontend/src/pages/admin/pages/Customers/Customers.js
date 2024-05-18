import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import UserTable from '../../components/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '~/redux/Admin/User/Action';
import Loading from '~/components/LoadingComponent/Loading';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
    },
    { id: 'name', label: 'Họ và tên', minWidth: 100, align: 'left' },
    {
        id: 'phone',
        label: 'Số điện thoại',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'role',
        label: 'Vai trò',
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

    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const isLoading = usersState.loading;
    const isError = usersState.error;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const rows = usersState.users.map((user, index) => ({ ...user, index: index + 1 }));

    console.log('usersState', usersState);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const users = await customerApi.getAll();
    //         const customersWithIndex = users.map((user, index) => ({ ...user, index: index + 1 }));
    //         setCustomerList(customersWithIndex);
    //     };

    //     fetchUsers();
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Khách hàng</h1>
            <UserTable columns={columns} rows={rows} rowPerPage={6} deleteButton={true} />
        </div>
    );
}

export default UsersManagement;
