import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from './ProductReviewCard.module.scss'

const cx = classNames.bind(styles);
function ProductReviewCard(props) {
    const {product} = props;
    return  ( 
        <>
            {product.reviews?.map((item) => (
                <div className={cx("wrapper")}>
                <Grid className={cx("box-comment")} container spacing={2} gap={0}>
            <Grid item xs={1}>
              <Box>
                <Avatar
                  className={cx("avatar")}
                  alt=""
                  src=""
                >
                  {item.username[0].toUpperCase()}
                </Avatar>
              </Box>
            </Grid>
            <Grid className={cx("content")} item xs={9}>
              <div className={cx("info")}>
                <div className="">
                  <p className={cx("name")}>{item.username}</p>
                  <p style={{opacity:0.7}}>{item.time}</p>
                </div>
                <div>
                
    
                  <Rating
                    value={item.rating}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                 
                </div>
                <p>
                  {item.review}
                </p>
              </div>
            </Grid>
          </Grid>
            </div>
            ))}
        </>
     );
}

export default ProductReviewCard;