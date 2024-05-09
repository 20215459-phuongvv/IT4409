import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';
import { ColorPicker, Image, Input, Select, Upload } from 'antd';
import { Button } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '~/utils';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AddProducts() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [colorInputs, setColorInputs] = useState([{ id: 1, color: '', imageList: [] }]);

    const handleChangeProductType = (value) => {
        setType(value);
    };

    const handleChangeProductSize = (value) => {
        setSize(value);
    };

    const handleOnChangeProductImage = async (fileInfo, colorIndex) => {
        const file = fileInfo.file;
        if (file.status === 'error') {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            const updatedColorInputs = [...colorInputs];
            updatedColorInputs[colorIndex].imageList.push(file.preview);
            setColorInputs(updatedColorInputs);
        }
    };

    const handleAddColorInput = () => {
        const newId = colorInputs[colorInputs.length - 1]?.id + 1;
        setColorInputs([...colorInputs, { id: newId, color: '', imageList: [] }]);
        updateColorIds();
    };

    const handleRemoveColor = (colorIndex) => {
        const updatedColorInputs = [...colorInputs];
        updatedColorInputs.splice(colorIndex, 1);
        setColorInputs(updatedColorInputs);
        updateColorIds();
    };

    const handleRemoveImage = (colorIndex, imageIndex) => {
        const updatedColorInputs = [...colorInputs];
        updatedColorInputs[colorIndex].imageList.splice(imageIndex, 1);
        setColorInputs(updatedColorInputs);
    };

    const updateColorIds = () => {
        setColorInputs((prevColorInputs) =>
            prevColorInputs.map((colorInput, index) => ({
                ...colorInput,
                id: index + 1,
            })),
        );
    };

    const handleAddProduct = () => {
        const data = {
            name: name,
            type: type,
            size: size,
            price: price,
            color: colorInputs,
        };
        // Call api
        console.log('product sent', data);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Thêm sản phẩm</h1>
            <div className={cx('container')}>
                <div className={cx('input-section')}>
                    <div className={cx('input-row')}>
                        <span className={cx('input-label')}>Tên sản phẩm</span>
                        <Input
                            placeholder="Nhập tên sản phẩm"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('input-row')}>
                        <span className={cx('input-label')}>Phân loại</span>
                        <Select
                            defaultValue="Áo"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChangeProductType}
                            options={[
                                {
                                    value: '1',
                                    label: 'Áo',
                                },
                                {
                                    value: '2',
                                    label: 'Quần',
                                },
                                {
                                    value: '3',
                                    label: 'Váy',
                                },
                                {
                                    value: '4',
                                    label: 'Phụ kiện',
                                },
                            ]}
                        />
                    </div>

                    <div className={cx('input-row')}>
                        <span className={cx('input-label')}>Kích thước</span>
                        <Select
                            defaultValue="S"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChangeProductSize}
                            options={[
                                {
                                    value: 'S',
                                    label: 'S',
                                },
                                {
                                    value: 'M',
                                    label: 'M',
                                },
                                {
                                    value: 'L',
                                    label: 'L',
                                },
                                {
                                    value: 'XL',
                                    label: 'XL',
                                },
                            ]}
                        />
                    </div>

                    <div className={cx('input-row')}>
                        <span className={cx('input-label')}>Giá</span>
                        <Input
                            placeholder="Nhập giá sản phẩm"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('color-image-input-wrapper')}>
                        <span className={cx('input-label')}>Màu sắc</span>

                        <div className={cx('main-input-wrapper')}>
                            {colorInputs.map((input, colorIndex) => (
                                <div key={input.id} className={cx('main-input')}>
                                    <ColorPicker
                                        className={cx('color-picker')}
                                        defaultValue="#1677ff"
                                        onChange={(value, hex) => {
                                            const updatedColorInputs = [...colorInputs];
                                            updatedColorInputs[colorIndex].color = hex;
                                            setColorInputs(updatedColorInputs);
                                        }}
                                    />

                                    <div className={cx('input-image')}>
                                        <Upload
                                            onChange={(fileInfo) => handleOnChangeProductImage(fileInfo, colorIndex)}
                                            showUploadList={false}
                                        >
                                            <button className={cx('add-image-btn')}>
                                                <UploadOutlined />
                                                Thêm ảnh
                                            </button>
                                        </Upload>

                                        {input.imageList && (
                                            <div className={cx('input-image-display')}>
                                                {input.imageList.map((image, imageIndex) => (
                                                    <div key={imageIndex} className={cx('image-item-wrapper')}>
                                                        <Image className={cx('image-item')} alt="" src={image} />
                                                        <Button
                                                            color="secondary"
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => handleRemoveImage(colorIndex, imageIndex)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        color="error"
                                        variant="outlined"
                                        onClick={() => handleRemoveColor(colorIndex)}
                                    >
                                        Xóa màu
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button
                        style={{ width: '150px', marginLeft: '300px' }}
                        size="medium"
                        variant="outlined"
                        onClick={handleAddColorInput}
                    >
                        Thêm màu sắc
                    </Button>
                </div>

                <div className={cx('add-product-btn')}>
                    <Button size="large" color="primary" variant="contained" onClick={handleAddProduct}>
                        Thêm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
