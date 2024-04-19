import React, { useContext } from "react";
import classNames from "classnames/bind";

import styles from './ProductDetail.module.scss'
import { ShopContext } from "~/context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "~/components/ProductDisplay/ProductDisplay";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer/Footer";
const cx = classNames.bind(styles)

function ProductDetail() {
    const {all_product}=useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <ProductDisplay product={product} />
            <Footer />
        </div>
     );
}

export default ProductDetail;