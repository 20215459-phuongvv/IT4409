package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_detail_id")
    private Long userDetailId;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phoneNumber")
    private String phoneNumber;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonIgnoreProperties("userDetailList")
//    private User user;
}
