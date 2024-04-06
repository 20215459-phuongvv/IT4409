import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search({placeholder}) {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faSearch} className={cx('icon-search')}/>
            <input type="text" className={cx('input')} placeholder={placeholder}/>
        </div>
    );
}

export default Search;
