import classNames from 'classnames/bind';
import styles from './TopBar.module.scss';
import Search from '~/components/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminSearch from '../AdminSearch';

const cx = classNames.bind(styles);

function TopBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>HUSTORE</div>
            <AdminSearch className={cx('search')}/>
            <div className={cx('action')}>
                <p className={cx('title')}>Admin</p>
                <AccountCircleIcon sx={{fontSize: '3rem'}}/>
            </div>
        </div>
    );
}

export default TopBar;
