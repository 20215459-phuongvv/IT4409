package com.IT4409.backend.dtos.OrderDTO;

import com.IT4409.backend.dtos.UserDetailDTO.UserDetailRequestDTO;
import com.IT4409.backend.entities.UserDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO {
    private UserDetail userDetail;
    private UserDetailRequestDTO userDetailRequestDTO;
    private String paymentMethod;
}
