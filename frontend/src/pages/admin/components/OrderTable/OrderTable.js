import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './OrderTable.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function OrderTable({ columns, rows, rowPerPage, handleUpdateStatus }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
    const [orderStatusArray, setOrderStatusArray] = useState(rows.map((row) => row.orderStatus));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleStatusChange = (orderId, event) => {
        const newStatus = event.target.value;
        setOrderStatusArray((prevStatuses) => {
            const newState = prevStatuses.map((status, index) =>
                rows[index].orderId === orderId ? newStatus : status
            );
            return newState;
        });
        handleUpdateStatus(newStatus, orderId);
    };

    const orderStatus = {
        CONFIRMED: 'Đã xác nhận',
        DELIVERED: 'Đang giao',
        SHIPPED: 'Đã giao',
        CANCELLED: 'Hủy',
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            const date = new Date(row?.createdAt);
                            const createdDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                                .toString()
                                .padStart(2, '0')}/${date.getFullYear()}`;
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <StyledTableCell align="left">{row.orderId}</StyledTableCell>
                                    <StyledTableCell align="left">{row.userDetail.name}</StyledTableCell>
                                    <StyledTableCell align="left">{createdDate}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.finalPrice.toLocaleString('vn-VN') + ' đ'}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.orderStatus}</StyledTableCell>
                                    <StyledTableCell align="left">{row.PaymentMethod}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.PaymentMethod === 'NET_BANKING' ? row.PaymentStatus : ''}
                                    </StyledTableCell>

                                    <StyledTableCell align="left">
                                        <Select
                                            style={{ height: '36px' }}
                                            value={orderStatusArray[index]}
                                            onChange={(event) => handleStatusChange(row.orderId, event)}
                                        >
                                            {Object.entries(orderStatus).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </StyledTableCell>
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

export default OrderTable;
