import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './RegistrationForm.module.scss';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import config from '~/config';
import { Grid, TextField, Button, Box } from '@mui/material';
import { register } from '~/redux/Auth/Action';

const cx = classNames.bind(styles);

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [ward, setWard] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Xử lý đăng ký
        dispatch(
            register({ email, password, name, address: province + ', ' + city + ', ' + ward, phoneNumber: phone }),
        );

        console.log('Email:', email);
        console.log('Mật khẩu:', password);
        console.log('Xác nhận mật khẩu:', confirmPassword);

        navigate('/');
    };

    return (
        <div className={cx('registration-form')}>
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password">Mật khẩu *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <Grid container spacing={3} className={cx('user-info')}>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="firstName">Họ *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder=""
                                required
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="lastName">Tên *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder=""
                                required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="city">Tỉnh/Thành phố *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder=""
                                required
                                value={province}
                                onChange={(event) => setProvince(event.target.value)}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="district">Quận/Huyện *</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder=""
                                required
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="ward">Phường/Xã *</label>
                            <input
                                type="text"
                                id="ward"
                                name="ward"
                                placeholder=""
                                required
                                value={ward}
                                onChange={(event) => setWard(event.target.value)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={cx('form-group')}>
                            <label htmlFor="phoneNumber">Số điện thoại *</label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder=""
                                required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className={cx('form-group')}>
                    <button type="submit" className={cx('btn', 'btn-primary')}>
                        Đăng ký
                    </button>
                </div>
            </form>
            <div className={cx('registration-options')}>
                <Link to={config.routes.login}>Bạn đã có tài khoản? Đăng nhập</Link>
            </div>
            <div className={cx('registration-terms')}>
                <p>Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
            </div>
        </div>
    );
};

export default RegistrationForm;
