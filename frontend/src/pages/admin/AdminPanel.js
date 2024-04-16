import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminPanel.module.scss';

import SideBar from './components/SideBar/SideBar';
import Dashboard from './pages/Dashboard';
import ProductsManagement from './pages/Products';
import UsersManagement from './pages/Users';
import OrdersManagement from './pages/Orders';
import TopBar from './components/TopBar';

const cx = classNames.bind(styles);

function AdminPanel() {
    return (
        <div className={cx('admin-wrapper')}>
            <TopBar />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('main')}>
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/products" element={<ProductsManagement />}></Route>
                        <Route path="/users" element={<UsersManagement />}></Route>
                        <Route path="/orders" element={<OrdersManagement />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
