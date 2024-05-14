import styles from './Checkout.css';
import classNames from 'classnames/bind';
import { ShopContext } from '~/context/ShopContext';
import React , {useState, useContext} from 'react';

const cx = classNames.bind(styles);
const numberWithCommas = (numberString) => {
    const number = parseInt(numberString, 10); // Chuyển đổi chuỗi thành số nguyên
    return number.toLocaleString('en-US');
};
function Checkout() {
    
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        ward: '',
    });
    const submitOrder = (e, payment_mode) => {
        e.preventDefault();
    }
    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

    const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);
    return ( 
        <div className='wrapper-checkout'>
            <h1>Xác nhận đơn hàng</h1>
            <div className='py-4'>
                <div className="container">

                    <div className="row">

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Thông tin cơ bản</h4>
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Họ</label>
                                                <input type="text" style={{fontSize:'14px'}} name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Tên</label>
                                                <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                                {/* <small className="text-danger">{error.lastname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Số điện thoại</label>
                                                <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                                {/* <small className="text-danger">{error.phone}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label> Địa chỉ Email</label>
                                                <input type="email" name="email" onChange={handleInput} value={checkoutInput.email}className="form-control" />
                                                {/* <small className="text-danger">{error.email}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label> Chi tiết địa chỉ</label>
                                                <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                                {/* <small className="text-danger">{error.address}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Tỉnh/Thành phố</label>
                                                <input type="text" name="city" onChange={handleInput} value= {checkoutInput.city} className="form-control" />
                                                {/* <small className="text-danger">{error.city}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Quận/Huyện</label>
                                                <input type="text" name="district" onChange={handleInput} value={checkoutInput.district} className="form-control" />
                                                {/* <small className="text-danger">{error.state}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Xã/Phường</label>
                                                <input type="text" name="ward" onChange={handleInput} value={checkoutInput.ward} className="form-control" />
                                                {/* <small className="text-danger">{error.zipcode}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type="button" className="btn btn-primary mx-1"  onClick={ (e) => submitOrder(e, 'cod') }>Thanh toán khi nhận hàng</button>
                                                <button type="button" className="btn btn-warning mx-1"  onClick={ (e) => submitOrder(e, 'payonline') }>Thanh toán bằng QR Code</button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Kích thước</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        all_product.map((product) => {
                                            const filteredCartItems = cartItems.filter((item) => item.id === product.id);

                                            return (
                                                <>
                                                    {filteredCartItems.map((cartItem ,index) => (
                                                        <tr key={index}>
                                                        <td>{product.name}</td>
                                                        <td>{product.size[cartItem.size]}</td>
                                                        <td>{product.newPrice}</td>
                                                        <td>{cartItem.quantity}</td>
                                                        <td>{numberWithCommas(
                                                        parseFloat(product.newPrice.replace(',', '')) * cartItem.quantity,
                                                    )}</td>
                                                    </tr>
                                                    ))}
                                                </>
                                            )
                                        })
                                    }

                                    <tr>
                                        <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                                        <td colSpan="3" className="text-end fw-bold">{numberWithCommas(getTotalCartAmount())}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
        </div>
        </div>
     );
}

export default Checkout;