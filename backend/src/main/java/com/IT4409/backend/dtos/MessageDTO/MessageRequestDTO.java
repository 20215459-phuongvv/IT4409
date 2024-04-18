package com.IT4409.backend.dtos.MessageDTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequestDTO {
    @NotNull
    private Long messageId;
    @NotNull
    private Long senderId;
    @NotNull
    private Long receiverId;
    @NotNull
    private String content;
    @NotNull
    private LocalDateTime time;
}
