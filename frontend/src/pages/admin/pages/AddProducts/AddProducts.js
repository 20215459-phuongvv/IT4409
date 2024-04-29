
import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';

const cx = classNames.bind(styles);

function AddProducts() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Thêm sản phẩm</h1>

        </div>
    );
}

export default AddProducts;
