package com.IT4409.backend.dtos.GptDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GptMessage {
    private String role;
    private String content;
}
