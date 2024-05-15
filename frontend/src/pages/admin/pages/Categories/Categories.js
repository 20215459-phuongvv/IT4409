import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import { Image, Input, Upload, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { createCategory } from '~/redux/Admin/Category/Action';
import * as message from '~/components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from '../../components/TableComponent';
import Loading from '~/components/LoadingComponent/Loading';

const cx = classNames.bind(styles);
const jwt =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTU3NjI3NzksImV4cCI6MTcxNTg0OTE3OSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20ifQ.8NnaPwJu6-Ehj039gMBxnW9Z1pWdoGXslxCQo1F-gACNrTMlMBeF_pAZGXGUEyYXmZlfBznMUVSu1yqixIxqdA';

// const columns = [
//     { id: 'index', label: 'STT', minWidth: 20 },
//     { id: 'name', label: 'Tên Voucher', minWidth: 100 },
//     { id: 'code', label: 'Mã giảm giá', minWidth: 100, align: 'left' },
//     {
//         id: 'value',
//         label: 'Giá trị',
//         minWidth: 50,
//         align: 'left',
//     },
//     {
//         id: 'condition',
//         label: 'Điều kiện đơn hàng',
//         minWidth: 60,
//         align: 'left',
//     },
//     {
//         id: 'maximum_value',
//         label: 'Giá trị tối đa',
//         minWidth: 30,
//         align: 'left',
//     },
//     {
//         id: 'delete',
//         label: 'Xóa',
//         minWidth: 30,
//         align: 'left',
//     },
//     {
//         id: 'update',
//         label: 'Cập nhật',
//         minWidth: 100,
//         align: 'left',
//     },
// ];

// function createData(name, code, value, condition, maximum_value) {
//     return { name, code, value, condition, maximum_value };
// }

// let data = [
//     createData('voucher_name_1', 'VC001', '10%', '≥ 100000', 50000),
//     createData('voucher_name_2', 'VC002', '15%', '≥ 100000', 30000),
//     createData('voucher_name_3', 'VC003', '20%', '≥ 200000', 60000),
// ];

// const rows = data.map((element, index) => ({ ...element, index: index + 1 }));

function CategoriesManagement() {
    const [categoryName, setCategoryName] = useState('');
    const [categoryThumbnail, setCategoryThumbnail] = useState(null);
    const [categoryThumbnailPreview, setCategoryThumbnailPreview] = useState('');
    const [isSubmittingAddCategory, setIsSubmittingAddCategory] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();
    const categoriesState = useSelector((state) => state.categories);

    const handleOnChangeCategoryThumbnail = (fileInfo) => {
        if (fileInfo.file.status === 'error') {
            setCategoryThumbnail(fileInfo.file.originFileObj);
            setCategoryThumbnailPreview(URL.createObjectURL(fileInfo.file.originFileObj));
        }
    };

    const handleRemoveCategoryThumbnail = () => {
        setCategoryThumbnail(null);
        setCategoryThumbnailPreview('');
    };

    const handleAddCategory = () => {
        const newCategory = new FormData();

        newCategory.append('categoryName', categoryName);
        if (categoryThumbnail) {
            newCategory.append('thumbnail', categoryThumbnail);
        }

        setIsSubmittingAddCategory(true);
        dispatch(createCategory({ data: newCategory, jwt }));
    };

    useEffect(() => {
        if (isSubmittingAddCategory && !categoriesState.loading) {
            if (categoriesState.error) {
                message.error('Thêm danh mục thất bại, chưa nhập đúng các trường thông tin hoặc lỗi đường truyền');
            } else {
                message.success('Thêm danh mục mới thành công!');
                setIsModalVisible(false);
            }
            setIsSubmittingAddCategory(false);
        }
    }, [isSubmittingAddCategory, categoriesState.loading, categoriesState.error]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh mục sản phẩm</h1>
            <div className={cx('show-add-category-modal')} onClick={showModal}>
                <AddCircleIcon />
                <span>Thêm danh mục</span>
            </div>

            {/* <TableComponent
                columns={columns}
                rows={rows}
                rowPerPage={6}
                type="categories"
                attributes={['index', 'name', 'code', 'value', 'condition', 'maximum_value']}
                deleteButton={true}
            /> */}

            <Modal
                width={700}
                title="Thêm danh mục mới"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" variant="contained" type="primary" onClick={handleAddCategory}>
                        Thêm danh mục
                    </Button>,
                ]}
            >
                <Loading isLoading={categoriesState.loading}>
                    <div className={cx('add-category-input')}>
                        <div className={cx('category-input-item')}>
                            <span className={cx('category-input-label')}>Tên danh mục</span>
                            <Input
                                placeholder="Nhập tên danh mục"
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                }}
                            />
                        </div>
    
                        <div className={cx('category-input-item')}>
                            <span className={cx('category-input-label')}>Ảnh đại diện</span>
                            <div className={cx('input-thumbnail')}>
                                <Upload onChange={handleOnChangeCategoryThumbnail} showUploadList={false}>
                                    <button className={cx('add-image-btn')}>
                                        <UploadOutlined />
                                        Chọn ảnh
                                    </button>
                                </Upload>
    
                                {categoryThumbnail && (
                                    <Image className={cx('image-item')} alt="" src={categoryThumbnailPreview} />
                                )}
    
                                {categoryThumbnail && (
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        onClick={handleRemoveCategoryThumbnail}
                                    >
                                        Xóa
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Loading>
            </Modal>
        </div>
    );
}

export default CategoriesManagement;
