package com.IT4409.backend.services;

import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.repositories.MessageRepository;
import com.IT4409.backend.services.interfaces.IMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MessageService implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MessageResponseDTO saveMessage(Message message) {
        message = messageRepository.save(message);
        return modelMapper.map(message, MessageResponseDTO.class);
    }

    @Override
    public List<MessageResponseDTO> getConversation(Long senderId, Long receiverId) {
        return null;
    }

    @Override
    public List<MessageResponseDTO> getAllMessageOfUser(String jwt) {
        return null;
    }

    @Override
    public List<User> getContactList(String jwt) {
        return null;
    }
}
