package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "UserDetail")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detailId")
    private int detailId;

    @OneToOne(mappedBy = "userDetail")
    private User user;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "phoneNumber", length = 20)
    private String phoneNumber;
}
