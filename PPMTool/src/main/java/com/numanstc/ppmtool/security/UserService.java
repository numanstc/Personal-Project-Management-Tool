package com.numanstc.ppmtool.security;

import com.numanstc.ppmtool.domain.User;
import com.numanstc.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {

        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

        // username has to be unique (exception)

        // make sure password and confirmPassword match
        // we don't persist or show confirmPassword
        return userRepository.save(newUser);
    }
}
