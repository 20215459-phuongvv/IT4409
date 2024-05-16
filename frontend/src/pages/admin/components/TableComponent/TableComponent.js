import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, MenuItem, Modal, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

import classNames from 'classnames/bind';
import styles from './TableComponent.module.scss';
import { Image } from 'antd';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function TableComponent({
    columns,
    rows,
    rowPerPage,
    type,
    attributes,
    deleteButton,
    contactButton,
    updateButton,
    actionButton,
    handleDelete,
    handleUpdate,
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);
    const [openVoucherUpdateBox, setOpenVoucherUpdateBox] = useState([]);
    const [openProductUpdateBox, setOpenProductUpdateBox] = useState([]);

    const [orderStatusArray, setOrderStatusArray] = useState(rows.map((row) => row.status));

    // useEffect(() => {
    //     const statusArray = rows.map((row) => row.status);
    //     setOrderStatusArray(statusArray);
    // }, []);

    const typeName = {
        customer: 'khách hàng',
        product: 'sản phẩm',
        order: 'đơn hàng',
        voucher: 'mã giảm giá',
        categories: 'danh mục',
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // delete ----------------------------------------------------
    const handleOpenDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseDeleteBox = (index) => {
        setOpenDeleteBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // Update Voucher ----------------------------------------------------
    const handleOpenVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseVoucherUpdateBox = (index) => {
        setOpenVoucherUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // update product
    const handleOpenProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleCloseProductUpdateBox = (index) => {
        setOpenProductUpdateBox((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // voucher action

    const handleStatusChange = (index, event) => {
        const newStatus = event.target.value;
        setOrderStatusArray((prevStatuses) => {
            const newState = [...prevStatuses];
            newState[index] = newStatus;
            return newState;
        });
        handleUpdateStatus(newStatus, index);
        // Gọi hàm xử lý cập nhật trạng thái đơn hàng ở đây (ví dụ: handleUpdateStatus(newStatus))
    };

    const handleUpdateStatus = (newStatus, index) => {
        console.log(`Đơn hàng thứ ${index + 1} đã được cập nhật thành ${newStatus}`);
    };

    return (
        <div className={cx('wrapper')}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ fontSize: '1.6rem', minWidth: `${column.minWidth}` }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    {/* {attributes.map((attribute, attrIndex) => (
                                        <StyledTableCell key={attrIndex} align="left">
                                            {attribute === 'thumbnail' ? (
                                                <Avatar src={row[attribute]} alt="" />
                                            ) : attribute === 'status' ? (
                                                orderStatusArray[row.index - 1]
                                            ) : (
                                                row[attribute]
                                            )}
                                        </StyledTableCell>
                                    ))} */}

                                    {/* Bảng sản phẩm */}
                                    {type === 'product' && (
                                        <>
                                            <StyledTableCell align="left">{row?.index}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Image
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'contain' }}
                                                    src={row?.thumbnail}
                                                    alt=""
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell align="left">{row?.productName}</StyledTableCell>

                                            <StyledTableCell align="left">
                                                {row?.category?.categoryName}
                                            </StyledTableCell>

                                            <StyledTableCell align="left">{row?.price}</StyledTableCell>

                                            <StyledTableCell align="left">{row?.quantityInStock}</StyledTableCell>
                                        </>
                                    )}

                                    {/* Các nút hành động */}
                                    {deleteButton && (
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenDeleteBox(row.index - 1)}
                                                variant="contained"
                                                color="error"
                                            >
                                                XÓA
                                            </Button>
                                            <Modal
                                                open={openDeleteBox[row.index - 1]}
                                                onClose={() => handleCloseDeleteBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('delete-confirm-box')}>
                                                    <p>
                                                        Xóa {typeName[type]} {row.productName} ?
                                                    </p>
                                                    <div className={cx('delete-box-row')}>
                                                        <Button
                                                            size="large"
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => {
                                                                handleDelete(row);
                                                                handleCloseDeleteBox(row.index - 1);
                                                            }}
                                                        >
                                                            Xóa
                                                        </Button>
                                                        <Button
                                                            size="large"
                                                            variant="outlined"
                                                            onClick={() => handleCloseDeleteBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}

                                    {contactButton && (
                                        <TableCell align="left">
                                            <Button onClick={() => {}} variant="contained" color="primary">
                                                NHẮN TIN
                                            </Button>
                                        </TableCell>
                                    )}

                                    {updateButton && type === 'voucher' && (
                                        // Cập nhật voucher
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenVoucherUpdateBox(row.index - 1)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                CẬP NHẬT
                                            </Button>

                                            <Modal
                                                open={openVoucherUpdateBox[row.index - 1]}
                                                onClose={() => handleCloseVoucherUpdateBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('update-modal-box')}>
                                                    <p className={cx('update-modal-title')}>Cập nhật Voucher</p>

                                                    <div className={cx('update-input-wrapper')}>
                                                        <div className={cx('update-input-row')}>
                                                            <p>Tên voucher</p>
                                                            <input
                                                                id={`voucher-name-${row.index - 1}`}
                                                                type="text"
                                                                defaultValue={row.name}
                                                                onChange={null}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Mã giảm giá</p>
                                                            <input
                                                                id={`voucher-code-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.code}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Giá trị</p>
                                                            <input
                                                                id={`voucher-value-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.value}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Điều kiện đơn hàng</p>
                                                            <input
                                                                id={`voucher-condition-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.condition}
                                                            />
                                                        </div>

                                                        <div className={cx('update-input-row')}>
                                                            <p>Giá trị tối đa</p>
                                                            <input
                                                                id={`voucher-maximum-value-${row.index - 1}`}
                                                                type="text"
                                                                onChange={null}
                                                                defaultValue={row.maximum_value}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={cx('update-modal-buttons')}>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            onClick={() => {
                                                                let data = {
                                                                    name: document.getElementById(
                                                                        `voucher-name-${row.index - 1}`,
                                                                    )?.value,
                                                                    code: document.getElementById(
                                                                        `voucher-code-${row.index - 1}`,
                                                                    )?.value,
                                                                    value: document.getElementById(
                                                                        `voucher-value-${row.index - 1}`,
                                                                    )?.value,
                                                                    condition: document.getElementById(
                                                                        `voucher-condition-${row.index - 1}`,
                                                                    )?.value,
                                                                    maximum_value: document.getElementById(
                                                                        `voucher-maximum-value-${row.index - 1}`,
                                                                    )?.value,
                                                                };

                                                                handleUpdate(data); // Hàm gọi API để cập nhật voucher bên Vouchers.js
                                                                handleCloseVoucherUpdateBox(row.index - 1);
                                                            }}
                                                        >
                                                            Cập nhật
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => handleCloseVoucherUpdateBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}

                                    {updateButton && type === 'product' && (
                                        // Cập nhật voucher
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleOpenProductUpdateBox(row.index - 1)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                CẬP NHẬT
                                            </Button>

                                            <Modal
                                                open={openProductUpdateBox[row.index - 1]}
                                                onClose={() => handleCloseProductUpdateBox(row.index - 1)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className={cx('update-modal-box')}>
                                                    <p className={cx('update-modal-title')}>Cập nhật sản phẩm</p>

                                                    <div className={cx('update-input-wrapper')}>
                                                        <div className={cx('update-input-row')}>
                                                            <p>Tên sản phẩm</p>
                                                            <input
                                                                id={`product-name-${row.index - 1}`}
                                                                type="text"
                                                                defaultValue={row.name}
                                                                onChange={null}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className={cx('update-modal-buttons')}>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            onClick={() => {
                                                                let data = {
                                                                    // name: document.getElementById(
                                                                    //     `voucher-name-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // code: document.getElementById(
                                                                    //     `voucher-code-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // value: document.getElementById(
                                                                    //     `voucher-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // condition: document.getElementById(
                                                                    //     `voucher-condition-${row.index - 1}`,
                                                                    // )?.value,
                                                                    // maximum_value: document.getElementById(
                                                                    //     `voucher-maximum-value-${row.index - 1}`,
                                                                    // )?.value,
                                                                };

                                                                handleUpdate(data); // Hàm gọi API để cập nhật voucher bên Vouchers.js
                                                                handleCloseProductUpdateBox(row.index - 1);
                                                            }}
                                                        >
                                                            Cập nhật
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={() => handleCloseProductUpdateBox(row.index - 1)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </TableCell>
                                    )}

                                    {actionButton && type === 'order' && (
                                        <TableCell align="left">
                                            <Select
                                                style={{ height: '36px' }}
                                                value={orderStatusArray[row.index - 1]}
                                                onChange={(event) => handleStatusChange(row.index - 1, event)}
                                            >
                                                <MenuItem value="Đang giao">Đang giao</MenuItem>
                                                <MenuItem value="Đã giao">Đã giao</MenuItem>
                                                <MenuItem value="Hủy">Hủy</MenuItem>
                                            </Select>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '50px',
                    fontSize: '1.4rem',
                    '.MuiTablePagination-selectLabel': {
                        color: 'rgb(41, 39, 39)',
                        fontSize: '1.4rem',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.4rem',
                        marginBottom: 0,
                    },
                }}
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
}

export default TableComponent;
