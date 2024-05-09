import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './ProductDisplay.module.scss';
import star_icon from '~/assets/images/star_icon.png';
import star_dull_icon from '~/assets/images/star_dull_icon.png';
import Button from '~/components/Button';
import { ShopContext } from '~/context/ShopContext';
const cx = classNames.bind(styles);

function ProductDisplay(props) {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedColor, setSelectedColor] = useState(product.colorList[0]); //chọn màu
    const [amount, setAmount] = useState(1); //chọn số lượng
    const [size, setSize] = useState(0); //chọn size
    const [avtiveImg, setActiveImg] = useState(selectedColor.colorImageList[0]); //main img
    const [colorChecked, setColorChecked] = useState(0);
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setActiveImg(color.colorImageList[0]);
    };
    const handleSize = (index) => {
        setSize(index);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('img')}>
                    <img className={cx('main-img')} src={avtiveImg}></img>
                </div>

                <div className={cx('img-list')}>
                    {selectedColor.colorImageList.map((imageItem) => (
                        <img
                            className={cx('img-list-item')}
                            src={imageItem}
                            onClick={() => setActiveImg(imageItem)}
                        ></img>
                    ))}
                </div>
            </div>

            <div className={cx('right')}>
                <h1>{product.name}</h1>
                <div className={cx('right-star')}>
                    <img src={star_icon}></img>
                    <img src={star_icon}></img>
                    <img src={star_icon}></img>
                    <img src={star_icon}></img>
                    <img src={star_icon}></img>
                    <p>112 đánh giá</p>
                </div>
                <div className={cx('right-prices')}>
                    <div className={cx('right-price-new')}>{product.newPrice}₫</div>
                    <div className={cx('right-price-old')}>{product.oldPrice}₫</div>
                </div>
                <div className={cx('right-size')}>
                    <p>Kích thước</p>
                    <div className={cx('right-sizes')}>
                        <Button
                            children="S"
                            className={cx('btn-size', { 'btn-size-active': size === 0 })}
                            onClick={() => handleSize(0)}
                        />

                        <Button
                            children="M"
                            className={cx('btn-size', { 'btn-size-active': size === 1 })}
                            onClick={() => handleSize(1)}
                        />

                        <Button
                            children="L"
                            className={cx('btn-size', { 'btn-size-active': size === 2 })}
                            onClick={() => handleSize(2)}
                        />

                        <Button
                            children="XL"
                            className={cx('btn-size', { 'btn-size-active': size === 3 })}
                            onClick={() => handleSize(3)}
                        />
                    </div>
                </div>
                <div className={cx('right-color')}>
                    <div className={cx('color-section')}>
                        <div className={cx('text')}>Màu sắc</div>
                        <div className={cx('list-color')}>
                            {product.colorList.map((color, index) => (
                                <div
                                    key={index}
                                    className={cx('color-item', { 'color-item-checked': colorChecked === index })}
                                    style={{ backgroundColor: color.colorName }}
                                    onClick={() => {
                                        handleColorSelect(color);
                                        setColorChecked(index);
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* số lượng */}
                <div className={cx('quantity-wrap')}>
                    <div className={cx('text')}>Số lượng</div>
                    <div className={cx('quantity')}>
                        <button
                            className={cx('btn-minus-add')}
                            onClick={() => setAmount((prev) => (prev - 1 === 0 ? 1 : prev - 1))}
                        >
                            -
                        </button>
                        <span className={cx('amount')}>{amount}</span>
                        <button className={cx('btn-minus-add')} onClick={() => setAmount((prev) => prev + 1)}>
                            +
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => {
                        addToCart(product.id, amount, size, selectedColor.colorName);
                    }}
                    className={cx('addToCart')}
                >
                    Thêm vào giỏ hàng
                </button>

                <div className={cx('right-description')}>
                    <hr />
                    <h3>Mô tả sản phẩm</h3>
                    <ul>
                        <li>Form xòe, có bản lưng, dây kéo một bên. Váy 2 lớp, có túi mổ 2 bên</li>
                        <li>Thun hầu như không nhăn, dày dặn, co giãn nhẹ, dễ bảo quản </li>
                        <li>Chiều dài váy 80cm bao gồm bản lưng 3cm</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
