package com.swapshop.SwapShop.controllers;


import com.swapshop.SwapShop.security.jwt.JwtUtils;
import com.swapshop.SwapShop.security.pojos.request.LoginRequest;
import com.swapshop.SwapShop.security.pojos.request.SignupRequest;
import com.swapshop.SwapShop.security.pojos.response.JwtResponse;
import com.swapshop.SwapShop.security.pojos.response.MessageResponse;
import com.swapshop.SwapShop.security.services.UserDetailsImpl;
import com.swapshop.SwapShop.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    private final UserService userService;

    public UserController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        String checkRequest = userService.checkRequest(signUpRequest);
        if(checkRequest != "ok"){
            return ResponseEntity.badRequest().body("User already exists");
        }else{
            userService.saveUser(signUpRequest);
        }
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

}
