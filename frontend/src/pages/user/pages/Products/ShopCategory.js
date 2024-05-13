import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { ShopContext } from '~/context/ShopContext';
import styles from './ShopCategory.module.scss';
import ProductItem from '~/components/ProductItem';
const cx = classNames.bind(styles);

function ShopCategory(props) {
    const { all_product } = useContext(ShopContext);
    return (
        <div className={cx('shop-category')}>
            <div className={cx('shopcategory-products')}>
                {all_product.map((item, index) => {
                    if (props.category === item.category) {
                        return <ProductItem key={index} data={item} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className={cx('shopcategory-loadmore')}>Hiện thị thêm sản phẩm</div>
        </div>
    );
}

export default ShopCategory;
