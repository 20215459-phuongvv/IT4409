import React, { useState, useEffect, useRef } from 'react';
import styles from './chat.css'; // Import CSS module

const Chat = () => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const chatboxFormRef = useRef(null);
    const chatboxMessageWrapperRef = useRef(null);
    const chatboxNoMessageRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        const chatboxForm = chatboxFormRef.current;

        const handleInputChange = () => {
            let line = textarea.value.split('\n').length;

            if (textarea.rows < 6 || line < 6) {
                textarea.rows = line;
            }

            if (textarea.rows > 1) {
                chatboxForm.style.alignItems = 'flex-end';
            } else {
                chatboxForm.style.alignItems = 'center';
            }

            setMessage(textarea.value);
        };

        textarea.addEventListener('input', handleInputChange);

        return () => {
            textarea.removeEventListener('input', handleInputChange);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValid(message)) {
            writeMessage();
            setTimeout(autoReply, 1000);
        }
    };

    const writeMessage = () => {
        const today = new Date();
        let newMessage = `
            <div class="chatbox-message-item sent">
                <span class="chatbox-message-item-text">
                    ${message.trim().replace(/\n/g, '<br>\n')}
                </span>
                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(
            today.getMinutes(),
        )}</span>
            </div>
        `;

        chatboxMessageWrapperRef.current.insertAdjacentHTML('beforeend', newMessage);
        chatboxFormRef.current.style.alignItems = 'center';
        textareaRef.current.rows = 1;
        textareaRef.current.focus();
        textareaRef.current.value = '';
        chatboxNoMessageRef.current.style.display = 'none';
        scrollBottom();
    };

    const autoReply = () => {
        const today = new Date();
        let newMessage = `
            <div class="chatbox-message-item received">
                <span class="chatbox-message-item-text">
                    Thank you for your awesome support!
                </span>
                <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(
            today.getMinutes(),
        )}</span>
            </div>
        `;

        chatboxMessageWrapperRef.current.insertAdjacentHTML('beforeend', newMessage);
        scrollBottom();
    };

    const addZero = (num) => {
        return num < 10 ? '0' + num : num;
    };

    const scrollBottom = () => {
        chatboxMessageWrapperRef.current.scrollTo(0, chatboxMessageWrapperRef.current.scrollHeight);
    };

    const isValid = (value) => {
        let text = value.replace(/\n/g, '');
        text = text.replace(/\s/g, '');

        return text.length > 0;
    };

    return (
        <div className={styles['chatbox-wrapper']}>
            <div className={styles['chatbox-toggle']}>
                <i className="bx bx-message-dots"></i>
            </div>
            <div className={styles['chatbox-message-wrapper']} ref={chatboxMessageWrapperRef}>
                <div className={styles['chatbox-message-header']}>
                    <div className={styles['chatbox-message-profile']}>
                        <img
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt=""
                            className={styles['chatbox-message-image']}
                        />
                        <div>
                            <h4 className={styles['chatbox-message-name']}>Jonathan Doe</h4>
                            <p className={styles['chatbox-message-status']}>online</p>
                        </div>
                    </div>
                    <div className={styles['chatbox-message-dropdown']}>
                        <i className="bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle"></i>
                        <ul className={styles['chatbox-message-dropdown-menu']}>
                            <li>
                                <a href="#">Search</a>
                            </li>
                            <li>
                                <a href="#">Report</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles['chatbox-message-content']}>
                    <h4 ref={chatboxNoMessageRef} className={styles['chatbox-message-no-message']}>
                        You don't have message yet!
                    </h4>
                    {/* Các tin nhắn trong cuộc trò chuyện sẽ được thêm thông qua mã JavaScript */}
                </div>
                <div className={styles['chatbox-message-bottom']}>
                    <form
                        action="#"
                        className={styles['chatbox-message-form']}
                        onSubmit={handleSubmit}
                        ref={chatboxFormRef}
                    >
                        <textarea
                            rows={1}
                            placeholder="Type message..."
                            className={styles['chatbox-message-input']}
                            defaultValue={''}
                            ref={textareaRef}
                        />
                        <button type="submit" className={styles['chatbox-message-submit']}>
                            <i className="bx bx-send"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
