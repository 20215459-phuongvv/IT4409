import React, { useState, useContext } from 'react';
import classNames from "classnames/bind";
import styles from './OrderSummary.module.scss'
import AddressCard from "../AddressCard/AddressCard";
import { ShopContext } from '~/context/ShopContext';
import { Button } from '@mui/material';
const cx = classNames.bind(styles);
const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};
const handleCreatePayment = () => {
    // const data={orderId:order.order?.id,jwt}
    // dispatch(createPayment(data))
}

const OrderSummary = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const orderId = searchParams.get('order_id');
    // const dispatch = useDispatch();
    // const jwt = localStorage.getItem('jwt');
    // const { order } = useSelector((state) => state);

    // console.log('orderId ', order.order);

    // useEffect(() => {
    //     dispatch(getOrderById(orderId));
    // }, [orderId]);

    // const handleCreatePayment = () => {
    //     // const data = { orderId: order.order?.id, jwt };
    //     // dispatch(createPayment(data));
    // };


    //Khi bấm vào nút Payment sẽ tạo đơn hàng --> Thử nghiệm
    const handleCreatePayment = () => {
        createOrder(cartItems, selectedAddress);
    }
    const { all_product, cartItems, getTotalCartAmount, selectedAddress, createOrder } = useContext(ShopContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('addressCard')}>
                <AddressCard address={selectedAddress}/>
            </div>
            <div className={cx('orderSummary')}>
                <div className={cx('order')}>
                    <div className={cx('format-main')}>
                        <p>Sản phẩm</p>
                        <p>Tên</p>
                        <p>Đơn giá</p>
                        <p>Kích thước</p>
                        <p>Số lượng</p>
                        <p>Màu sắc</p>
                        <p>Thành tiền</p>
                    </div>
                    <hr />
                    {cartItems.length > 0 ? (
                        all_product.map((product) => {
                            const filteredCartItems = cartItems.filter((item) => item.id === product.id);

                            if (filteredCartItems.length > 0) {
                                return (
                                    <div key={product.id}>
                                        {filteredCartItems.map((cartItem) => (
                                            <div key={`${product.id}-${cartItem.size}`}>
                                                <div className={cx('cartItems-format', 'format-main')}>
                                                    <img src={product.img} alt={product.name} className={cx('product-icon')} />
                                                    <p>{product.name}</p>
                                                    <p>{product.newPrice}₫</p>
                                                    <p> {product.size[cartItem.size]}</p>
                                                    <p className={cx('quantity')}> {cartItem.quantity}</p>
                                                    <div
                                                        className={cx('color-item')}
                                                        style={{ backgroundColor: cartItem.color }}
                                                    ></div>
                                                    <p>
                                                        {numberWithCommas(
                                                            parseFloat(product.newPrice.replace(',', '')) * cartItem.quantity,
                                                        )}
                                                        ₫
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                    </div>
                                );
                            }

                            return null;
                        })
                    ) : (
                        <div className="cart-empty">Giỏ hàng trống</div>
                    )}
                </div>
                <div className={cx('totalPrice')}>
                    <div className={cx('cartitems-total')}>
                        <h1>Tổng thanh toán</h1>
                        <div>
                            <div className={cx('cartitems-total-item')}>
                                <p>Giá trị sản phẩm</p>
                                <p>{numberWithCommas(getTotalCartAmount())}₫</p>
                            </div>
                            <hr />
                            <div className={cx('cartitems-total-item')}>
                                <p>Phí vận chuyển</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className={cx('cartitems-total-item')}>
                                <h3>Tổng</h3>
                                <h3>{numberWithCommas(getTotalCartAmount())}₫</h3>
                            </div>
                        </div>

                    </div>
                </div>
                <Button
                    onClick={handleCreatePayment}
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "200px", height: "50px" }}
                >
                    Payment
                </Button>

            </div>
        </div>
    )
}

export default OrderSummary;