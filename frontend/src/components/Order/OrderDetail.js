import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import OrderTraker from './OrderTraker';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useParams } from 'react-router-dom';

import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import AddressCard from '../AddressCard/AddressCard';
const cx = classNames.bind(styles);
const OrderDetails = () => {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Grid container className="p-3 shadow-lg">
                <Grid xs={12}>
                    <p className={cx('address')}>Delivery Address</p>
                </Grid>
                <Grid item xs={6}>
                    <AddressCard />
                </Grid>
            </Grid>
            <Box className={cx('stepContainer')}>
                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Grid item xs={9}>
                        <OrderTraker activeStep={3} />  {/*order.order?.orderStatus === "PLACED"
              ? 1
              : order.order?.orderStatus === "CONFIRMED"
              ? 2
              : order.order?.orderStatus === "SHIPPED"
              ? 3
  : 5 thay vào 3 */ }
                    </Grid>
                    {/* <Grid item>
                        {order.order?.orderStatus === 'DELIVERED' && (
                            <Button sx={{ color: '' }} color="error" variant="text">
                                RETURN
                            </Button>
                        )}

                        {order.order?.orderStatus !== 'DELIVERED' && (
                            <Button sx={{ color: deepPurple[500] }} variant="text">
                                cancel order
                            </Button>
                        )}
                    </Grid> */}
                </Grid>
            </Box>

            <Grid container className={cx('containerOrderItem')} >
                {/* {order.order?.orderItems.map((item) => ( */}
                  {[1,1,1,1,1].map((item)=>(
                    <Grid
                    container
                    item
                    className={cx('cardOrder')}
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Grid item xs={6}>
                        {' '}
                        <div className={cx('cardItem')}>
                          {/*{item?.product.imageUrl} thay vào src*/}
                            <img
                                className={cx('cartImg')}
                                src="https://product.hstatic.net/200000037048/product/z5389847628985_2af0a4ff1cc71c498970772c54cd79f6_5eb3502d3d9347baa8d5762cd0ba0c7b_master.jpg"
                                alt=""
                            />
                            <div className={cx('cardContent')}>
                                <p className="">Áo Tokyo duyên dáng, dáng dài</p>      {/*{item.product.title}*/}
                                <p className={cx('cardText')}>
                                    <span>Color: pink</span> <span>Size: M</span>   {/*item.size*/}
                                </p>
                                <p>Seller: HUSTORE</p>
                                <p>699,999đ</p>    {/*item.price*/} 
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                      {/*${item.product.id} thêm vào sau rate/ */}
                        {
                            <Box
                            onClick={() => navigate(`/account/rate/`)}                  
                                sx={{ color: deepPurple[500] }}
                                className={cx('box-rate')}
                            >
                                <StarIcon sx={{ fontSize: '2rem' }} className={cx('star-icon')} />
                                <span>Rate & Review Product</span>
                            </Box>
                        }
                    </Grid>
                </Grid>
                  ))}  
                    
                {/* ))} */}
            </Grid>
        </div>
    );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
