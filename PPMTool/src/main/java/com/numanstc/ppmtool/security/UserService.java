package com.numanstc.ppmtool.security;

import com.numanstc.ppmtool.domain.User;
import com.numanstc.ppmtool.exceptions.UsernameAlreadyExistException;
import com.numanstc.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {

        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            // username has to be unique (exception)


            // make sure password and confirmPassword match
            // we don't persist or show confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (DataIntegrityViolationException exception) {
            throw new UsernameAlreadyExistException(String.format("Username '%s' Already Exist", newUser.getUsername()));
        }
    }
}
