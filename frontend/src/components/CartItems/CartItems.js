import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CartItems.module.scss';
import remove_icon from '~/assets/images/cart_cross_icon.png';
import { ShopContext } from '~/context/ShopContext';
import { Button } from '@mui/material';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '~/redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeCartItem } from '~/redux/Customers/Cart/Action';
import { useFetchData } from '~/hooks/useFetchData';
import productApi from '~/api/productApi';
import cartApi from '~/api/cartApi';
const cx = classNames.bind(styles);

const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};
function CartItems() {
    const navigate = useNavigate();
    // const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    // const [cart, setCart] = useState(null);
    const isLoading = useRef(false);
    const [cartUpdated, setCartUpdated] = useState(false);
    const totalPrice = useRef(0);
    useEffect(() => {
        async function getCartData() {
            try {
                isLoading.current = true;
                // const response = await cartApi.getAll(jwt);
                // setCart(response);
                dispatch(getCart(jwt));
                //console.log('cart here', cart);
                setCartUpdated(false);
            } catch (error) {
                console.log(error);
            }
        }
        getCartData();
    }, [jwt, cartUpdated]);

    useEffect(() => {
        if (cart) {
            console.log(cart);
            isLoading.current = false;
            let total = 0;
            cart.cartItemList?.forEach((cartItem) => {
                const price =
                    parseFloat(cartItem.discountPrice ? cartItem.discountPrice : cartItem.price) * cartItem.quantity;
                total += price;
            });
            totalPrice.current = total;
        }
    }, [cart]);

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
                                    <div className={cx('color-item')} style={{ backgroundColor: cartItem.color }}></div>
                                    <p>{numberWithCommas(price)}₫</p>

                                    <img
                                        src={remove_icon}
                                        alt="Remove item"
                                        className={cx('cart-remove-icon')}
                                        onClick={async () => {
                                            await dispatch(removeCartItem({ cartItemId: cartItem.cartItemId, jwt }));
                                            setCartUpdated(true);
                                        }}
                                    />
                                </div>
                            </div>
                            <hr />
                        </div>
                    );
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
                            <p>{numberWithCommas(totalPrice.current)}₫</p>
                        </div>
                        <hr />
                        <div className={cx('cartitems-total-item')}>
                            <p>Phí vận chuyển</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className={cx('cartitems-total-item')}>
                            <h3>Tổng</h3>
                            <h3>{numberWithCommas(totalPrice.current)}₫</h3>
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate('/checkout?step=2')}
                        variant="contained"
                        type="submit"
                        sx={{
                            padding: '.8rem 2rem',
                            marginTop: '2rem',
                            width: '50%',
                            backgroundColor: '#ff5a5a',
                            fontSize: '1.25rem',
                        }}
                        className={cx('btn-cart')}
                    >
                        PROCESS TO CHECKOUT
                    </Button>
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
