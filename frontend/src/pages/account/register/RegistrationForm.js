import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './RegistrationForm.module.scss';
import config from '~/config';
import { register } from '~/redux/Auth/Action';

const cx = classNames.bind(styles);
const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Xử lý đăng ký
        dispatch(register({ email, password }));

        console.log('Email:', email);
        console.log('Mật khẩu:', password);
        console.log('Xác nhận mật khẩu:', confirmPassword);

        navigate('/');
    };

  return (
    <div className={cx("registration-form")}>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Nhập email'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='********'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='********'
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className={cx("form-group")}>
          <button type="submit" className={cx("btn", "btn-primary")}>Đăng ký</button>
        </div>
      </form>
      <div className={cx("registration-options")}>
      <Link to = {config.routes.login}>Bạn đã có tài khoản? Đăng nhập</Link>

      </div>
      <div className={cx("registration-terms")}>
        <p>
          Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản
          sử dụng của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
