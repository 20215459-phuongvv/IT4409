import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import DiscountProducts from '~/assets/discount_products';
const cx = classNames.bind(styles);

function Discount() {
    return (
        <div className={cx('element-wrapper')}>
            {DiscountProducts.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default Discount;
