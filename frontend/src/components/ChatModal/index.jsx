import { useSocket } from '../../hooks/useSocket';
import { FaTimes } from 'react-icons/fa';
import ChatBox from '../Chat/ChatBox';
import './ChatModal.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    }, []);
    const sendMessage = useSocket(currentUser.user.userId);
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
