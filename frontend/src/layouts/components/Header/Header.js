import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

function Header() {
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
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <Link to = {config.routes.login}><Button primary>Đăng nhập</Button></Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
