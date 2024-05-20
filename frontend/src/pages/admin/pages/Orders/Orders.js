import classNames from 'classnames/bind';
import styles from './Orders.module.scss';
import OrderTable from '../../components/OrderTable';

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
        id: 'payment-method',
        label: 'Phương thức TT',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'payment-status',
        label: 'Trạng thái TT',
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
        orderId: 9,
        userId: 2,
        orderStatus: 'PENDING',
        PaymentStatus: 'PENDING',
        PaymentMethod: 'NET_BANKING',
        createdAt: '2024-05-19T10:06:59.600588',
        totalAmount: 15370550,
        discountedAmount: 59846700,
        discountFromVoucher: null,
        finalPrice: 15370550,
        qrLink: 'https://img.vietqr.io/image/mb-0963861815-compact2. jpg?amount=15370550&addInfo=Order%209&accountName=VU%20VIỆT%20PHƯƠNG',
        orderItemList: [
            {
                orderItemId: 9,
                orderId: 9,
                productName: 'áo',
                quantity: 5,
                ' size': 'L',
                color: 'Đen',
                price: 50000000,
                thumbnail:
                    'http://res.cloudinary.com/dj2lvmrop/image/upload/v1715485535/hustore/thumbnails/thumbnail. jpeg.jpg',
            },
            {
                orderItemId: 10,
                orderId: 9,
                productName: 'áo',
                quantity: 1,
                size: 'M',
                color: 'Đen',
                ' giá': 10000000,
                'hình thu nhỏ':
                    'http://res.cloudinary.com/dj2lvmrop/image/upload/v1715485535/hustore/thumbnails/thumbnail.jpeg.jpg',
            },
        ],
        userDetail: {
            userDetailId: 2,
            name: 'deadlinerunnerr',
            address: 'Hoàng Mai, Hà Nội',
            phoneNumber: '0963861815',
        },
    },
];

const rows = data.map((element, index) => ({ ...element, index: index + 1 }));

console.log(rows);

function OrdersManagement() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Đơn hàng</h1>
            <OrderTable columns={columns} rows={rows} rowPerPage={6} />
        </div>
    );
}

export default OrdersManagement;
