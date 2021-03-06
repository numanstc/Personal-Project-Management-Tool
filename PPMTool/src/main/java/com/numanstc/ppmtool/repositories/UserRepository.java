package com.numanstc.ppmtool.repositories;

import com.numanstc.ppmtool.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User getById(Long id); // şimdilik Optional kullanmak istemiyoruz


}
