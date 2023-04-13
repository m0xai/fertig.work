package work.fertig.backend.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import work.fertig.backend.user.exceptions.UserAlreadyExistsException;

@RestController
@RequestMapping("/api/v1")
@Validated
public class FWUserController {

    @Autowired
    private final FWUserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public FWUserController(FWUserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping("/user")
    @CrossOrigin(origins = "http://localhost:4200")
    public FWUser user(FWUser user) {
        return user;
    }

    @GetMapping("/users")
    public List<FWUser> getAllUsers() {
        return repository.findAll();
    }

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<FWUserDto> createUser(@Valid @RequestBody FWUser user) {
        if (repository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("email: " + user.getEmail());
        }
        if (repository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException("username: " + user.getUsername());
        }

        FWUser fwUser = new FWUser();
        fwUser.setUsername(user.getUsername());
        fwUser.setEmail(user.getEmail());
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        fwUser.setPassword(encodedPassword);
        FWUser savedUser = repository.save(user);

        FWUserDto fwUserDto = new FWUserDto(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword(),
                savedUser.getEmail());

        return new ResponseEntity<>(fwUserDto, HttpStatus.CREATED);
    }

    // @CrossOrigin(origins = "http://localhost:4200/*")
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<String> authenticateUser(@RequestBody FWUserDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

}
