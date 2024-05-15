import { Box, Grid } from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import classNames from "classnames/bind";
import styles from './Order.module.scss'
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "~/redux/Customers/Order/Action";
const cx = classNames.bind(styles)

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", vlue: "returned" },
];

const Order = () => {


  return (
    <Box className={cx('wrapper')}> 
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
        </Grid>
        <Grid item xs={9}>
          <Box className={cx('list-card')}>
            {[1,1,1,1,1].map((item) =>(
                <div className={cx('item-card')}>
                        <OrderCard />
                </div>
            ))}
                
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
