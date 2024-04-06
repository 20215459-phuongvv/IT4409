package com.IT4409.backend.dtos.MessageDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponseDTO {
    private Long messageId;
    private Long senderId;
    private Long receiverId;
    private String content;
    private Date time;
}
