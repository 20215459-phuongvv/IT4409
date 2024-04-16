import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import StatisticItem from '../../components/DashboardPage/StatisticItem';
import admin_images from '~/assets/images/admin';
import RevenueChart from '../../components/DashboardPage/RevenueChart';
import DashboardListItem from '../../components/DashboardPage/DashboardListItem/DashboardListItem';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Dashboard</h1>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <StatisticItem
                        value="1.750.000"
                        unit="đ"
                        title="Tổng doanh thu"
                        img={admin_images.revenue}
                        backgroundImageColor="#F1EF99"
                    />
                    <StatisticItem
                        value="26"
                        unit=""
                        title="Số khách hàng"
                        img={admin_images.user}
                        backgroundImageColor="#E78895"
                    />
                    <StatisticItem
                        value="386"
                        unit=""
                        title="Số sản phẩm"
                        img={admin_images.product}
                        backgroundImageColor="#B4D4FF"
                    />
                    <StatisticItem
                        value="47"
                        unit=""
                        title="Tổng số đơn hàng"
                        img={admin_images.invoice}
                        backgroundImageColor="#8DECB4"
                    />
                </div>
                <div className={cx('bottom')}>
                    <div className={cx('chart')}>
                        <h4 className={cx('chart-label')}>Doanh thu tuần</h4>
                        <RevenueChart />
                    </div>
                    <div className={cx('list-container')}>
                        <h4>Khách hàng mới</h4>
                        <div className={cx('list')}>
                            <DashboardListItem
                                img={admin_images.user}
                                row1="Đào Anh Quân"
                                row2="Ngày gia nhập: 16/04/2024"
                            />
                            <DashboardListItem
                                img={admin_images.user}
                                row1="Đào Anh Quân"
                                row2="Ngày gia nhập: 16/04/2024"
                            />
                            <DashboardListItem
                                img={admin_images.user}
                                row1="Đào Anh Quân"
                                row2="Ngày gia nhập: 16/04/2024"
                            />
                            <DashboardListItem
                                img={admin_images.user}
                                row1="Đào Anh Quân"
                                row2="Ngày gia nhập: 16/04/2024"
                            />
                        </div>
                    </div>
                    <div className={cx('list-container')}>
                        <h4>Sản phẩm bán chạy</h4>
                        <div className={cx('list')}>
                            <DashboardListItem
                                img="https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg"
                                row1="Váy Fuji Ô Vuông Xanh"
                                row2="Phân loại: Chân váy"
                            />
                            <DashboardListItem
                                img="https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg"
                                row1="Váy Fuji Ô Vuông Xanh"
                                row2="Phân loại: Chân váy"
                            />
                            <DashboardListItem
                                img="https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg"
                                row1="Váy Fuji Ô Vuông Xanh"
                                row2="Phân loại: Chân váy"
                            />
                            <DashboardListItem
                                img="https://product.hstatic.net/200000037048/product/fuji_o_vuong_xanh_a35812226dfc4f16937ae174c432a82c_master.jpg"
                                row1="Váy Fuji Ô Vuông Xanh"
                                row2="Phân loại: Chân váy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
