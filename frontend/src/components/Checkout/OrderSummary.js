import React, { useState, useContext } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './OrderSummary.module.scss';
import AddressCard from '../AddressCard/AddressCard';
import { ShopContext } from '~/context/ShopContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const cx = classNames.bind(styles);
const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10);
    return number.toLocaleString('en-US');
};
// const handleCreatePayment = () => {
//     // const data={orderId:order.order?.id,jwt}
//     // dispatch(createPayment(data))
// };

const OrderSummary = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const navigate = useNavigate();
    const handleCreatePaymentCOD = () => {
        createOrder(cartItems, selectedAddress);
        navigate('/checkout?step=4');
    };
    const handleCreatePaymentOnline = async () => {
        createOrder(cartItems, selectedAddress);
        //QR CODE
        navigate('/checkout?step=4');
        try {
            const totalAmount = getTotalCartAmount();
            const response = await axios.post('/api/qr-code', { amount: totalAmount });
            setQrCode(response.data.qrCodeUrl);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };
    const { all_product, cartItems, getTotalCartAmount, selectedAddress, createOrder } = useContext(ShopContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('addressCard')}>
                <AddressCard address={selectedAddress} />
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
                                                    <img
                                                        src={product.img}
                                                        alt={product.name}
                                                        className={cx('product-icon')}
                                                    />
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
                                                            parseFloat(product.newPrice.replace(',', '')) *
                                                                cartItem.quantity,
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
            </div>
            <div className={cx('payment-section')}>
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
            {isOpenPopup && 
                <div
                    onClick={() => setIsOpenPopup(false)}
                    className={cx('popup-overlay')}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={cx('popup-content')}
                    >
                        {/* Header */}
                        <div className={cx('popup-header')}>
                            <h1 className={cx('popup-title')}>QR CODE INTERNET BANKING</h1>
                            <div
                                onClick={() => setIsOpenPopup(false)}
                                className={cx('popup-close')}
                            >
                                <AiOutlineCloseSquare />
                            </div>
                        </div>
                        {/* Body */}
                        <div>
                        {qrCode ? <img src={qrCode} alt="QR Code" /> : <img src ='https://img.vietqr.io/image/MB-3107200368888-compact2.png' />}
                        </div>
                        {/* Footer */}
                        <div className={cx('popup-footer')}>
                            <div className={cx('footer-button')}><Button
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
                        </Button></div>
                        <div className={cx('footer-button')}><Button
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
                        </Button></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderSummary;
