package com.swapshop.SwapShop.repositories;

import com.swapshop.SwapShop.entities.ERole;
import com.swapshop.SwapShop.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

