package work.fertig.backend.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String encoedpassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encoedpassword);
        User savedUser = userRepository.save(user);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}
