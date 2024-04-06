import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import MostSale from '~/pages/Home/MostSale';
import Discount from '~/pages/Home/Discount';
import NewProducts from '~/pages/Home/NewProducts';
import Blog from './Blog';

const cx = classNames.bind(styles);

function Home() {
    // const homeElements = [MostSale, Discount];
    const [displayElement, setDisplayElement] = useState(0);

    const handleDisplayElement = (index) => {
        setDisplayElement(index);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <img className={cx('banner-img')} src={images.banner} alt="banner" />
            </div>

            <div className={cx('products')}>
                <div className={cx('products-header')}>
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 0 })}
                        children="Mua nhiều"
                        onClick={() => handleDisplayElement(0)}
                    />
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 1 })}
                        children="Hàng mới"
                        onClick={() => handleDisplayElement(1)}
                    />
                    <Button
                        className={cx('home-product-nav', { 'home-product-nav-active': displayElement === 2 })}
                        children="Giảm giá"
                        onClick={() => handleDisplayElement(2)}
                    />
                </div>

                <div className={cx('products-body')}>
                    {displayElement === 0 && <MostSale />}
                    {displayElement === 1 && <NewProducts />}
                    {displayElement === 2 && <Discount />}
                </div>
            </div>
            <Blog />
        </div>
    );
}

export default Home;
