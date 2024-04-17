package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;

import java.util.List;

public interface IMessageService {
    MessageResponseDTO saveMessage(Message message);

    List<MessageResponseDTO> getConversation(Long senderId, Long receiverId);

    List<MessageResponseDTO> getAllMessageOfUser(String jwt);

    List<User> getContactList(String jwt);
}
