import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames/bind";
import styles from './OrderCard.module.scss';
const cx = classNames.bind(styles);

const OrderCard = () => {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/account/order/${1}`)}>

    <Box className={cx('wrapper')}>
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            // onClick={() => navigate(`/account/order/${order?.id}`)}
            className={cx('orderCard')}
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://product.hstatic.net/200000037048/product/z5389847628985_2af0a4ff1cc71c498970772c54cd79f6_5eb3502d3d9347baa8d5762cd0ba0c7b_master.jpg"
              alt=""
            />
            <div  className={cx('item')}>
              <p className={cx('item-title')}>Áo Chuchu Linh Lan</p> {/*title*/}
              <p className={cx('item-size')} >
                 <span>Size: M</span> {/* {item?.size} */}
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>699,999đ</p>  {/*item?.price*/}
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
        {/*order?.orderStatus === "DELIVERED" thay vào true*/ }    
        { true ? ( 
             <>
             <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className={cx('icon-status')}
                />
                <span>Delivered On Mar 03</span>

            </>
            ):  <>
               
                <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className={cx('icon-status')}
              />
              <span>Expected Delivery On Mar 03</span>
              </>}
            
          </p>
          <p className="text-xs">Your Item Has Been Delivered</p>
          {/* {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )} */}
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default OrderCard;
