import React, { useState } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import config from '~/config';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Xử lý đăng nhập

    console.log('Email:', email);
    console.log('Mật khẩu:', password);
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Nhập email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='**********'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Nhớ tài khoản</label>
          <a href="#" className="forgot-password">Quên mật khẩu?</a>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
      <div className="login-options">
        <Link to = {config.routes.register}>Bạn chưa có tài khoản? Đăng ký</Link>
      </div>
      <div className="login-terms">
        <p>
          Việc tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản
          sử dụng của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
