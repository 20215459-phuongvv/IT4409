import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';
import newProducts from '~/assets/new_products';
const cx = classNames.bind(styles);

function NewProducts() {
    

    return (
        <div className={cx('element-wrapper')}>
            {newProducts.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default NewProducts;
