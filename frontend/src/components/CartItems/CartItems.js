import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './CartItems.module.scss';
import remove_icon from '~/assets/images/cart_cross_icon.png';
import { ShopContext } from '~/context/ShopContext';
import Button from '../Button';
import config from '~/config';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};
function CartItems() {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('format-main')}>
                <p>Sản phẩm</p>
                <p>Tên</p>
                <p>Đơn giá</p>
                <p>Kích thước</p>
                <p>Số lượng</p>
                <p>Màu sắc</p>
                <p>Thành tiền</p>
                <p>Xóa</p>
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
                                            <img
                                                src={remove_icon}
                                                alt="Remove item"
                                                className={cx('cart-remove-icon')}
                                                onClick={() =>
                                                    removeFromCart(product.id, cartItem.size, cartItem.color)
                                                }
                                            />
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
            <div className={cx('cartitems-down')}>
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
                  <Link to = {config.routes.checkout}><Button children="PROCESS TO CHECKOUT" className={cx('btn-cart')}  /> </Link>  
                  
                </div>
                <div className={cx('cartitems-promocode')}>
                    <p>Nếu bạn có mã giảm giá, hãy áp dụng vào đây</p>
                    <div className={cx('cartitems-promobox')}>
                        <input type="text" placeholder="Voucher" />
                        <button className={cx('btn-promo')}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
