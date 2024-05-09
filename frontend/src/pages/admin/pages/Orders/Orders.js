import classNames from 'classnames/bind';
import styles from './Orders.module.scss';
import TableComponent from '../../components/TableComponent';

const cx = classNames.bind(styles);

const columns = [
    { id: 'order-id', label: 'Mã đơn hàng', minWidth: 60 },
    { id: 'name', label: 'Tên khách hàng', minWidth: 100, align: 'left' },
    {
        id: 'day',
        label: 'Ngày đặt hàng',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'total',
        label: 'Tổng tiền',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'contact',
        label: 'Liên hệ',
        minWidth: 30,
        align: 'left',
    },
];

const rows = [
    {
        orderID: 'HD001',
        customerName: 'Đào Anh Quân',
        date: '17/04/2024',
        total: '1.000.000đ',
        status: 'Đang giao',
    },
];

function OrdersManagement() {
    const attributes = ['orderID', 'customerName', 'date', 'total', 'status'];

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
            <h1 className={cx('title')}>Đơn hàng</h1>
            <TableComponent columns={columns} rows={rows} attributes={attributes} contactButton={true} />
        </div>
    );
}

export default OrdersManagement;
