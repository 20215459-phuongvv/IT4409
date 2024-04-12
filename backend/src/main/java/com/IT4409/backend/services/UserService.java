package com.IT4409.backend.services;

import com.IT4409.backend.Utils.UserRole;
import com.IT4409.backend.dtos.AuthDTO.AuthRequestDTO;
import com.IT4409.backend.dtos.AuthDTO.AuthResponseDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import com.IT4409.backend.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CartService cartService;
    @Override
    public List<User> findAllUsers() {
        return userRepository.findAllByOrderByCreatedAtDesc();
    }
    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtTokenProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        return user;
    }
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(messages.getString("user.validate.not-found")));
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }
    public AuthResponseDTO createUser(User user) throws BadRequestException {
        String email = user.getEmail();
        String password = user.getPassword();
        String role = UserRole.CUSTOMER.toString();
        if(userRepository.existsByEmail(email)) {
            throw new BadRequestException(messages.getString("email.validate.duplicate"));
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setRole(role);
        newUser = userRepository.save(newUser);
        // Tạo ra giỏ hàng mới cho khách hàng mới
        cartService.createCart(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token, true);
        return authResponseDTO;
    }
    public AuthResponseDTO signIn(AuthRequestDTO authRequestDTO) throws BadCredentialsException{
        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        String username = authRequestDTO.getEmail();
        String password = authRequestDTO.getPassword();
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.generateToken(authentication);
        authResponseDTO.setStatus(true);
        authResponseDTO.setJwt(accessToken);
        return authResponseDTO;
    }
    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = loadUserByUsername(username);
        if(userDetails == null) {
            throw new BadCredentialsException(messages.getString("username.validate.invalid"));
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException(messages.getString("password.validate.invalid"));
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
