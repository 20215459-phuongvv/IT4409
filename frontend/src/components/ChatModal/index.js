import { useSocket } from '../../hooks/useSocket';
import { FaTimes } from 'react-icons/fa';
import ChatBox from '../Chat/ChatBox';
import './ChatModal.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const ChatModal = (props) => {
    const { selectedUser, closeChatBox } = props;

    const { user } = useSelector((state) => state.auth);

    const currentUser = user;
    const [chosenUser, setChosenUser] = useState(null);

    useEffect(() => {
        setChosenUser(selectedUser);
        console.log(selectedUser);
        return () => {
            setChosenUser(null);
            console.log(chosenUser);
        };
    }, [selectedUser]); // Thêm selectedUser vào dependency array của useEffect để trigger khi selectedUser thay đổi

    const sendMessage = useSocket(currentUser?.user?.userId); // Kiểm tra currentUser tồn tại trước khi truy cập user.userId

    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    // Kiểm tra xem user đã đăng nhập chưa, nếu chưa thì chuyển hướng đến trang đăng nhập
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            <div className="modal-container">
                <div className="chat-modal">
                    <ChatBox selectedUser={chosenUser} sendMessage={sendMessage} />
                    <FaTimes className="modal-close" onClick={closeChatBox} />
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
