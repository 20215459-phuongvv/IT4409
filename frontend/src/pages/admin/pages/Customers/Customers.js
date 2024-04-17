import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Modal } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import customerApi from '~/api/customerApi';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const columns = [
    { id: 'index', label: 'STT', minWidth: 20 },
    { id: 'username', label: 'Tên đăng nhập', minWidth: 60 },
    { id: 'name', label: 'Họ và tên', minWidth: 100, align: 'left' },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'phone-number',
        label: 'Số điện thoại',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
];

function createData(index, username, name, email, phoneNumber) {
    return { index, username, name, email, phoneNumber };
}

// const rows = [
//     createData(
//         1,
//         'anhquan',
//         'Đào Anh Quân',
//         'anhquan7303qqq@gmail.com',
//         '0972833225',
//     )
// ];

function UsersManagement() {
    const [customerList, setCustomerList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openDeleteBox, setOpenDeleteBox] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await customerApi.getAll();
            const customersWithIndex = users.map((user, index) => ({ ...user, index: index + 1 }));
            setCustomerList(customersWithIndex);
            setOpenDeleteBox(Array(customersWithIndex.length).fill(false));
        };

        fetchUsers();
    }, []);

    console.log(customerList);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDeleteCustomer = (id) => {
        handleCloseDeleteBox(id - 1);
        console.log(`delete ${id}`);
    };

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

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Khách hàng</h1>
            <TableContainer className={cx('table-container')}>
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
                        {customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={customer.index}>
                                    <StyledTableCell align="left">{customer.index}</StyledTableCell>
                                    <StyledTableCell align="left">{customer.username}</StyledTableCell>
                                    <StyledTableCell align="left">{customer.name}</StyledTableCell>
                                    <StyledTableCell align="left">{customer.email}</StyledTableCell>
                                    <StyledTableCell align="left">{customer.phone}</StyledTableCell>
                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleOpenDeleteBox(customer.index - 1)}
                                            variant="contained"
                                            color="error"
                                        >
                                            XÓA
                                        </Button>
                                        <Modal
                                            open={openDeleteBox[customer.index - 1]}
                                            onClose={() => handleCloseDeleteBox(customer.index - 1)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <div className={cx('delete-confirm-box')}>
                                                <p>Xóa khách hàng {customer.name} ?</p>
                                                <div className={cx('delete-box-row')}>
                                                    <Button
                                                        size="large"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDeleteCustomer(customer.index)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                    <Button
                                                        size="large"
                                                        variant="outlined"
                                                        onClick={() => handleCloseDeleteBox(customer.index - 1)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </TableCell>
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
                    },
                }}
                rowsPerPageOptions={[6]}
                component="div"
                count={customerList.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Số hàng'}
                page={page}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default UsersManagement;
