import { Box, Grid } from '@mui/material';
import React, { useEffect,useContext, useSyncExternalStore } from 'react';
import OrderCard from './OrderCard';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import classNames from 'classnames/bind';
import styles from './Order.module.scss'
import { ShopContext } from '~/context/ShopContext';

// import { useDispatch, useSelector } from "react-redux";
// import { getOrderHistory } from "~/redux/Customers/Order/Action";
const cx = classNames.bind(styles);
function Order() {
    const { all_product, order } = useContext(ShopContext);
    return (
        <Box className={cx("wrapper")}>
            <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={9}>
                    <Box className="space-y-5 ">
                        {order.orders?.length > 0 &&
                            order.orders?.map((order) => {
                                return order?.orderItems?.map((item, index) => <OrderCard item={item} order={order} />);
                            })}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Order;
