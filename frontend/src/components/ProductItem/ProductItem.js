import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <Link to={`/products/${data.productId}`} className={cx('wrapper')}>
            <img className={cx('img')} src={data.thumbnail} alt="" />
            <p className={cx('name')}>{data.productName}</p>
            <div className={cx('price')}>
                <p className={cx('new-price')}>{data.discountPrice}đ</p>
                {data.price && <p className={cx('old-price')}>{data.price}đ</p>}
            </div>
        </Link>
    );
}

export default ProductItem;
