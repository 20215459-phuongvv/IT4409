import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';
import { ShopContext } from '~/context/ShopContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Search';
import { useContext } from 'react';

const cx = classNames.bind(styles);
const currentUser = false;

function Header() {
    const { getTotalCartItem } = useContext(ShopContext);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* <Link to={config.routes.home} className={cx('logo')}>
                    <img src="https://theme.hstatic.net/200000037048/1001083096/14/logo.png?v=723" alt="logo" />
                </Link> */}

                <Search placeholder="Tìm kiếm" />

                <nav className={cx('nav')}>
                    <Link to={config.routes.home} className={cx('home')}>
                        Trang chủ
                    </Link>
                    <Link to={config.routes.products} className={cx('products')}>
                        Sản phẩm
                    </Link>
                    <Link>Bán chạy</Link>
                    <Link>Blog</Link>
                    <Link>Liên hệ</Link>
                </nav>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <></>
                    ) : (
                        <div className={cx('nav-login-cart')}>
                            <FontAwesomeIcon icon={faHeart} />
                            <div className={cx('cart-icon-wrapper')}>
                                <Link to={config.routes.cart}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>
                                <span className={cx('nav-cart-count')}>{getTotalCartItem()}</span>
                            </div>
                            <Link to={config.routes.login}>
                                <Button primary>Đăng nhập</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
