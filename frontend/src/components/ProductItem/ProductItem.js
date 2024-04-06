import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <Link to={`/products/${data.id}`} className={cx('wrapper')}>
            <img className={cx('img')} src={data.img} alt="" />
            <p className={cx('name')}>{data.name}</p>
            <div className={cx('price')}>
                <p className={cx('new-price')}>{data.newPrice}</p>
                {data.oldPrice && <p className={cx('old-price')}>{data.oldPrice}</p>}
            </div>
        </Link>
    );
}

export default ProductItem;
