package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.ERole;
import com.swapshop.SwapShop.entities.Role;
import com.swapshop.SwapShop.entities.User;
import com.swapshop.SwapShop.repositories.PostRepository;
import com.swapshop.SwapShop.repositories.RoleRepository;
import com.swapshop.SwapShop.repositories.UserRepository;
import com.swapshop.SwapShop.security.pojos.request.SignupRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final PostRepository postRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.postRepository = postRepository;
    }

    @Override
    public User getUser(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public void updateUserFavorites(User user){
        userRepository.save(user);
    }

    public String checkRequest(SignupRequest signupRequest){
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return "Username is already taken!";
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return "Email is already taken!";
        }
        return "ok";
    }

    @Override
    public void saveUser(SignupRequest signupRequest) {
        // Create new user's account
        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
    }
}
