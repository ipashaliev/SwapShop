package com.swapshop.SwapShop.services;

import com.swapshop.SwapShop.entities.User;
import com.swapshop.SwapShop.security.pojos.request.SignupRequest;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void updateUserFavorites(User user);
    String checkRequest(SignupRequest signupRequest);
    void saveUser(SignupRequest signupRequest);
    User getUser(String username);
}
