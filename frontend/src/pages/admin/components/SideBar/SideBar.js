import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { SideBarData } from './SideBarData';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar() {
    console.log(cx);
    return (
        <div className={cx('wrapper')}>
            <ul>
                {SideBarData.map((item, key) => {
                    return (
                        <li key={key}>
                            <NavLink
                                to={item.link}
                                className={({ isActive }) => {
                                    console.log(key, isActive);
                                    const linkClasses = [cx('sideBar-item')];
                                    if (isActive) linkClasses.push(cx('active'));
                                    return linkClasses.join(' ');
                                }}
                            >
                                <div className={cx('sideBar-item-icon')}>{item.icon}</div>
                                <div className={cx('sideBar-item-title')}>{item.title}</div>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;
