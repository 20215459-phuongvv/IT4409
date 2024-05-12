import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import images from '~/assets/images';

const cx = classNames.bind(styles)

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Xử lý đăng nhập

    console.log('login excute', formData)
  };

  return (
    <div className={cx("login-form")}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Nhập email'
            required
            value={formData.email}
            onChange={changeHandler}
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='**********'
            required
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <div className={cx("remember-forgot")}>
            <label><input type='checkbox' /> Nhớ tài khoản</label>
            <a href='#'>Quên mật khẩu?</a>
        </div>
        <div className={cx("form-group")}>
          <button type="submit" className={cx("btn btn-primary")}>Đăng nhập</button>
        </div>
      </form>
      
      <div className={cx("register-link")}>
        <p>Bạn chưa có tài khoản? <Link to = {config.routes.register}>Đăng ký</Link> </p>
      </div>
      <div className={cx("login-terms")}>
        <p>
          Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản
          sử dụng của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
