import classNames from "classnames/bind";
import styles from './Thankyou.module.scss'
import images from "~/assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Thankyou() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/account/order');
    }
    return ( 
        <div className={cx('wrapper')}>
            <img src={images.tick} />
            <h2>Cảm ơn bạn !</h2>
            <p>Bạn đã đặt hàng thành công. Đơn hàng đang chờ xử lý và sẽ đến tay bạn một cách nhanh chóng nhất !</p>
            <button type="button" onClick={handleSubmit}>OK</button>
        </div>
     );
}

export default Thankyou;