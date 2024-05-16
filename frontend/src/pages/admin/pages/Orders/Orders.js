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
    {
        id: 'action',
        label: 'Cập nhật',
        minWidth: 30,
        align: 'left',
    },
];

const data = [
    {
        orderID: 'HD001',
        customerName: 'Đào Anh Quân',
        date: '17/04/2024',
        total: '1.000.000đ',
        status: 'Đã giao',
    },
    {
        orderID: 'HD002',
        customerName: 'Đào Anh Quân',
        date: '17/04/2024',
        total: '3.000.000đ',
        status: 'Đang giao',
    },
];

const rows = data.map((element, index) => ({ ...element, index: index + 1 }));

console.log(rows);

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
            <TableComponent
                columns={columns}
                rows={rows}
                rowPerPage={6}
                type="order"
                attributes={attributes}
                contactButton={true}
                actionButton={true}
            />
        </div>
    );
}

export default OrdersManagement;
