package com.IT4409.backend.dtos.MessageGroupDTO;

import com.IT4409.backend.dtos.MessageDTO.MessageDTO;
import lombok.Data;

@Data
public class MessageGroupDTO extends MessageDTO {
    private long groupId;
}
