package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.entities.EmailDetails;

public interface IEmailService {
    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);
}
