import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopCategory from './ShopCategory';
const cx = classNames.bind(styles);

function Products() {
    const [menu, setMenu] = useState(0);
    const handleDisplayMenu = (index) => setMenu(index);

    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('cate-filter')}>
                    <div className={cx('category')}>
                        <p>Loại sản phẩm</p>
                        <div className={cx('category-detail')}>
                            <Link to="#">
                                <Button
                                    className={cx('category-nav', { 'category-nav-active': menu === 0 })}
                                    children="Quần"
                                    onClick={() => handleDisplayMenu(0)}
                                />
                            </Link>
                            <Link to="#">
                                <Button
                                    className={cx('category-nav', { 'category-nav-active': menu === 1 })}
                                    children="Áo"
                                    onClick={() => handleDisplayMenu(1)}
                                />
                            </Link>
                            <Link to="#">
                                <Button
                                    className={cx('category-nav', { 'category-nav-active': menu === 2 })}
                                    children="Váy"
                                    onClick={() => handleDisplayMenu(2)}
                                />
                            </Link>
                            <Link to="#">
                                <Button
                                    className={cx('category-nav', { 'category-nav-active': menu === 3 })}
                                    children="Phụ kiện"
                                    onClick={() => handleDisplayMenu(3)}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('filter')}></div>

                    <div className={cx('products-body')}>
                        {menu === 0 && <ShopCategory category="quan" />}
                        {menu === 1 && <ShopCategory category="ao" />}
                        {menu === 2 && <ShopCategory category="vay" />}
                        {menu === 3 && <ShopCategory category="phukien" />}
                    </div>
                </div>

                <div className={cx('filter')}>filter</div>
            </div>

            <div className={cx('products-body')}>
                {menu === 0 && <ShopCategory category="quan" />}
                {menu === 1 && <ShopCategory category="ao" />}
                {menu === 2 && <ShopCategory category="vay" />}
                {menu === 3 && <ShopCategory category="phukien" />}
            </div>
        </div>
    );
}

export default Products;
