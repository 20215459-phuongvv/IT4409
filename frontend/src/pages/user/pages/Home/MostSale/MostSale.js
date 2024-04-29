import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import mostSaleProducts from '~/assets/most_sale_products';

const cx = classNames.bind(styles);

function MostSale() {
    return (
        <div className={cx('element-wrapper')}>
            {mostSaleProducts.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default MostSale;
