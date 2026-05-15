package com.example.schneider.trash_to_treasure.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendRecoverCode(String to, String code){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Password Recover");
        message.setText("Your recovery code is: " + code);

        mailSender.send(message);
    }
}
