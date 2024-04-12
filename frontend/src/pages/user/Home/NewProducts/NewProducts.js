import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function NewProducts() {
    const newProducts = [
        {
            id: 1,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 2,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 3,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 4,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 5,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 6,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 7,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
        {
            id: 8,
            img: 'https://product.hstatic.net/200000037048/product/ao_canh_tien_trang_967ec082e6be473f9e3c041c8575fb92_grande.jpg',
            name: 'Váy Fuji Vệt Nâu',
            newPrice: '790,000đ',
        },
    ];

    return (
        <div className={cx('element-wrapper')}>
            {newProducts.map((product) => (
                <ProductItem data={product} key={product.id} />
            ))}
        </div>
    );
}

export default NewProducts;
