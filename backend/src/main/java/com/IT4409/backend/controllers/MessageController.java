package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.MessageDTO.MessageDTO;
import com.IT4409.backend.services.MessageService;
import com.IT4409.backend.services.UserAndGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserAndGroupService userAndGroupService;
    @MessageMapping("/chat/{to}")
    public void sendMessagePersonal(@DestinationVariable String to, MessageDTO messageDTO){
        messageService.sendMessage(to, messageDTO);
    }
    @GetMapping("listmessage/{from}/{to}")
    public List<Map<String, Object>> getListMessageChat(@PathVariable("from") long from,
                                                        @PathVariable("to") long to)
    {
        return null;
    }
}
