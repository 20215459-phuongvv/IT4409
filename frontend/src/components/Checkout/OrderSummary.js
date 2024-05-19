import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './OrderSummary.module.scss';
import AddressCard from '../AddressCard/AddressCard';
import { ShopContext } from '~/context/ShopContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '~/redux/Customers/Order/Action';

const cx = classNames.bind(styles);
const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10);
    return number.toLocaleString('en-US');
};
// const handleCreatePayment = () => {
//     // const data={orderId:order.order?.id,jwt}
//     // dispatch(createPayment(data))
// };

const OrderSummary = ({ address }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const { cart, error } = useSelector((store) => store.carts);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const isLoading = useRef(false);
    const totalPrice = useRef(0);
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const data = {};
    if (address.userDetailId) {
        data['userDetailId'] = address.userDetailId;
    } else {
        data['userDetailRequestDTO'] = address;
    }

    const getTotalPrice = () => {
        if (cart && totalPrice !== 0) {
            console.log(cart);
            let total = 0;
            cart.cartItemList?.forEach((cartItem) => {
                const price =
                    parseFloat(cartItem.discountPrice ? cartItem.discountPrice : cartItem.price) * cartItem.quantity;
                total += price;
            });
            totalPrice.current = total;
        }
        return totalPrice.current;
    };

    const handleCreatePaymentCOD = async () => {
        await dispatch(createOrder({ jwt, dto: { paymentMethod: 'CASH_ON_DELIVERY', ...data } }));
        if (error) return <div>Error</div>;
        else navigate('/checkout?step=4');
    };
    const handleCreatePaymentOnline = async () => {
        await dispatch(createOrder({ jwt, dto: { paymentMethod: 'NET_BANKING', ...data } }));
        //QR CODE
        navigate('/checkout?step=4');
        try {
            const totalAmount = getTotalPrice();
            const response = await axios.post('/api/qr-code', { amount: totalAmount });
            setQrCode(response.data.qrCodeUrl);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('addressCard')}>
                <AddressCard address={address} />
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
                    {!isLoading.current && cart?.cartItemList?.length ? (
                        cart.cartItemList.map((cartItem) => {
                            const price =
                                parseFloat(cartItem.discountPrice ? cartItem.discountPrice : cartItem.price) *
                                cartItem.quantity;
                            return (
                                <div key={cartItem.cartItemId}>
                                    <div key={`${cartItem.cartItemId}-${cartItem.size}`}>
                                        <div className={cx('cartItems-format', 'format-main')}>
                                            <img
                                                src={cartItem.thumbnail}
                                                alt={cartItem.productName}
                                                className={cx('product-icon')}
                                            />
                                            <p>{cartItem.productName}</p>
                                            <p>{cartItem.discountPrice ? cartItem.discountPrice : cartItem.price}₫</p>
                                            <p> {cartItem.size}</p>
                                            <p className={cx('quantity')}> {cartItem.quantity}</p>
                                            <div
                                                className={cx('color-item')}
                                                style={{ backgroundColor: cartItem.color }}
                                            ></div>
                                            <p>{numberWithCommas(price)}₫</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    ) : (
                        <div className="cart-empty">Giỏ hàng trống</div>
                    )}
                </div>
            </div>
            <div className={cx('payment-section')}>
                <div className={cx('totalPrice')}>
                    <div className={cx('cartitems-total')}>
                        <h1>Tổng thanh toán</h1>
                        <div>
                            <div className={cx('cartitems-total-item')}>
                                <p>Giá trị sản phẩm</p>
                                <p>{numberWithCommas(getTotalPrice())}₫</p>
                            </div>
                            <hr />
                            <div className={cx('cartitems-total-item')}>
                                <p>Phí vận chuyển</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className={cx('cartitems-total-item')}>
                                <h3>Tổng</h3>
                                <h3>{numberWithCommas(getTotalPrice())}₫</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('payment-option')}>
                    <h2>Lựa chọn thanh toán:</h2>

                    <div className={cx('payment-methods')}>
                        <Button
                            onClick={handleCreatePaymentCOD}
                            variant="contained"
                            type="submit"
                            sx={{
                                padding: '.8rem 2rem',
                                marginTop: '2rem',
                                width: '200px',
                                height: '50px',
                                backgroundColor: '#c3957b',
                            }}
                        >
                            Thanh toán khi nhận hàng
                        </Button>
                    </div>

                    <div className={cx('payment-methods')}>
                        <Button
                            onClick={() => setIsOpenPopup(true)}
                            variant="contained"
                            type="submit"
                            sx={{
                                padding: '.8rem 2rem',
                                marginTop: '2rem',
                                width: '200px',
                                height: '50px',
                                backgroundColor: '#c3957b',
                            }}
                        >
                            Thanh toán bằng QR Code
                        </Button>
                    </div>
                </div>
            </div>
            {console.log(isOpenPopup)}
            {isOpenPopup && (
                <div onClick={() => setIsOpenPopup(false)} className={cx('popup-overlay')}>
                    <div onClick={(e) => e.stopPropagation()} className={cx('popup-content')}>
                        {/* Header */}
                        <div className={cx('popup-header')}>
                            <h1 className={cx('popup-title')}>QR CODE INTERNET BANKING</h1>
                            <div onClick={() => setIsOpenPopup(false)} className={cx('popup-close')}>
                                <AiOutlineCloseSquare />
                            </div>
                        </div>
                        {/* Body */}
                        <div>
                            {qrCode ? (
                                <img src={qrCode} alt="QR Code" />
                            ) : (
                                <img src="https://img.vietqr.io/image/MB-3107200368888-compact2.png" />
                            )}
                        </div>
                        {/* Footer */}
                        <div className={cx('popup-footer')}>
                            <div className={cx('footer-button')}>
                                <Button
                                    onClick={() => setIsOpenPopup(false)}
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        padding: '.8rem 2rem',
                                        marginTop: '2rem',
                                        width: '100px',
                                        height: '40px',
                                        backgroundColor: '#c3957b',
                                    }}
                                >
                                    Đóng
                                </Button>
                            </div>
                            <div className={cx('footer-button')}>
                                <Button
                                    onClick={() => handleCreatePaymentOnline()}
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        padding: '.8rem 2rem',
                                        marginTop: '2rem',
                                        width: '100px',
                                        height: '40px',
                                        backgroundColor: '#c3957b',
                                    }}
                                >
                                    Xác nhận thanh toán
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
