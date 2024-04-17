package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.MessageDTO.MessageRequestDTO;
import com.IT4409.backend.dtos.MessageDTO.MessageResponseDTO;
import com.IT4409.backend.entities.Message;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.services.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class MessageController {
    @Autowired
    SimpMessagingTemplate messagingTemplate;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    MessageService messageService;
    @MessageMapping("/send-message")
    public void sendMessage(@Payload MessageRequestDTO messageRequest){
        Message message = modelMapper.map(messageRequest, Message.class);
        MessageResponseDTO messageResponseDTO = messageService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/queue/messages", messageResponseDTO);
    }
    @GetMapping("/history")
    public ResponseEntity<List<MessageResponseDTO>> getConversation(
            @RequestParam(name = "senderId") Long senderId,
            @RequestParam(name = "receiverId") Long receiverId) {
        List<MessageResponseDTO> messageResponseDTOList = messageService.getConversation(senderId, receiverId);
        return ResponseEntity.ok(messageResponseDTOList);
    }
    @GetMapping("/get-user-messages")
    public ResponseEntity<List<MessageResponseDTO>> getAllMessagesOfUser(@RequestHeader("Authorization") String jwt){
        List<MessageResponseDTO> messageList = messageService.getAllMessageOfUser(jwt);
        return ResponseEntity.ok(messageList);
    }
    @GetMapping("/api/message/contact-list")
    public ResponseEntity<List<User>> getContactList(@RequestHeader("Authorization") String jwt){
        List<User> userList = messageService.getContactList(jwt);
        return ResponseEntity.ok(userList);
    }
}
