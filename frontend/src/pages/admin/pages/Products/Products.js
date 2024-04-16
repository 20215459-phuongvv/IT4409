import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const columns = [
    { id: 'image', label: 'Hình ảnh', minWidth: 20 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 100, align: 'left' },
    {
        id: 'category',
        label: 'Phân loại',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 60,
        align: 'left',
    },
    {
        id: 'quantity',
        label: 'Số lượng',
        minWidth: 30,
        align: 'left',
    },
    {
        id: 'delete',
        label: 'Xóa',
        minWidth: 30,
        align: 'left',
    },
];

function createData(image, name, category, price, quantity) {
    return { image, name, category, price, quantity };
}

const rows = [
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
    createData(
        'https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg',
        'Váy Fuji Ô Vuông Xanh',
        'Chân váy',
        750000,
        20,
    ),
];

export default function ProductsManagement() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Danh sách sản phẩm</h1>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <StyledTableCell align="left">
                                        <Avatar src={row.image} alt={row.name} />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">{row.category}</StyledTableCell>
                                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                                    <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" color="error">
                                            XÓA
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    fontSize: '1.4rem',
                    '.MuiTablePagination-selectLabel': {
                        color: 'rgb(41, 39, 39)',
                        fontSize: '1.4rem',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.4rem',
                    },
                }}
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Số hàng'}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}
