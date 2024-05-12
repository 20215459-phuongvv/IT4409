import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegistrationForm.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })
  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(event) => {
    event.preventDefault();

  //   // Xử lý đăng ký
  //   console.log(formData)
  //   let responeData;
  //   await fetch('http://localhost:3000/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/form-data',
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify(formData),
  //   }).then((response) => response.json()).then((data) => responeData=data)

  //   if(responeData.success) {
  //     localStorage.setItem('auth-token', responeData.token);
  //     window.location.replace("/");
  //   }
    
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
            placeholder='********'
            required
            value={formData.password}
            onChange={changeHandler}
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
            value={formData.confirmPassword}
            onChange={changeHandler}
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
