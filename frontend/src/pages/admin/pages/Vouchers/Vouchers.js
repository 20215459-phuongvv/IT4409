import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Vouchers.module.scss';
import TableComponent from '../../components/TableComponent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Modal } from '@mui/material';

const cx = classNames.bind(styles);

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'name', label: 'Tên Voucher', minWidth: 100 },
    { id: 'code', label: 'Mã giảm giá', minWidth: 100, align: 'left' },
    {
        id: 'value',
        label: 'Giá trị',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'condition',
        label: 'Điều kiện đơn hàng',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'maximum_value',
        label: 'Giá trị tối đa',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'update',
        label: 'Cập nhật',
        minWidth: 100,
        align: 'left',
    },
];

function createData(name, code, value, condition, maximum_value) {
    return { name, code, value, condition, maximum_value };
}

let data = [
    createData('voucher_name_1', 'VC001', '10%', '≥ 100000', 50000),
    createData('voucher_name_2', 'VC002', '15%', '≥ 100000', 30000),
    createData('voucher_name_3', 'VC003', '20%', '≥ 200000', 60000),
];

const rows = data.map((element, index) => ({ ...element, index: index + 1 }));


function Vouchers() {
    const [openAddVoucher, setOpenAddVoucher] = useState(false);
    // const [newVoucher, setNewVoucher] = useState({
    //     name: '',
    //     code: '',
    //     value: '',
    //     condition: '',
    //     maximum_value: '',
    // });

    const handleOpenAddVoucher = () => {
        setOpenAddVoucher(true);
    };

    const handleCloseAddVoucher = () => {
        setOpenAddVoucher(false);
    };

    // Gọi API ở đây
    const handleDelete = (index) => {
        alert(`delete voucher ${index}`);
    };

    const handleUpdateVoucher = (voucher) => {
        console.log('Updated voucher:', voucher);
    };

    const handleAddVoucher = (newVoucher) => {
        console.log('Added voucher:', newVoucher);
    };

    console.log(openAddVoucher);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <h1 className={cx('title')}>Danh sách Voucher</h1>
                <div className={cx('add-voucher')} onClick={handleOpenAddVoucher}>
                    <AddCircleIcon sx={{ color: 'green', fontSize: '1.8rem' }} />
                    <p>Thêm Voucher mới</p>
                </div>
                <Modal
                    open={openAddVoucher}
                    onClose={handleCloseAddVoucher}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={cx('add-voucher-box')}>
                        <p className={cx('add-voucher-title')}>Thêm Voucher mới</p>
                        <div className={cx('add-voucher-wrapper')}>
                            <div className={cx('add-voucher-row')}>
                                <p>Tên voucher</p>
                                <input id="new-voucher-name" type="text" placeholder="Nhập tên Voucher" />
                            </div>

                            <div className={cx('add-voucher-row')}>
                                <p>Mã giảm giá</p>
                                <input id="new-voucher-code" type="text" placeholder="Nhập mã giảm giá" />
                            </div>

                            <div className={cx('add-voucher-row')}>
                                <p>Giá trị</p>
                                <input id="new-voucher-value" type="text" placeholder="Giá trị giảm (%)" />
                            </div>

                            <div className={cx('add-voucher-row')}>
                                <p>Điều kiện đơn hàng</p>
                                <input
                                    id="new-voucher-condition"
                                    type="text"
                                    placeholder="Giá trị đơn hàng tối thiểu"
                                />
                            </div>

                            <div className={cx('add-voucher-row')}>
                                <p>Giá trị tối đa</p>
                                <input id="new-voucher-maximum-value" type="text" placeholder="Giá trị tối đa" />
                            </div>

                            <div className={cx('add-voucher-buttons')}>
                                <Button
                                    color="info"
                                    variant="contained"
                                    onClick={() => {
                                        let data = {
                                            name: document.getElementById('new-voucher-name')?.value,
                                            code: document.getElementById('new-voucher-code')?.value,
                                            value: document.getElementById('new-voucher-value')?.value,
                                            condition: document.getElementById('new-voucher-condition')?.value,
                                            maximum_value: document.getElementById('new-voucher-maximum-value')?.value,
                                        };
                                        handleAddVoucher(data);
                                    }}
                                >
                                    Cập nhật
                                </Button>
                                <Button onClick={handleCloseAddVoucher}>Đóng</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            
            <TableComponent
                columns={columns}
                rows={rows}
                type="voucher"
                attributes={['index', 'name', 'code', 'value', 'condition', 'maximum_value']}
                deleteButton={true}
                updateButton={true}
                handleDelete={handleDelete}
                handleUpdate={handleUpdateVoucher}
            />
        </div>
    );
}

export default Vouchers;
