package work.fertig.backend.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class FWUserController {

    @Autowired
    private final FWUserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public FWUserController(FWUserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    public List<FWUser> getAllUsers() {
        return repository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<FWUserDto> createUser(@Validated @RequestBody FWUser user) {
        if (repository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        FWUser fwUser = new FWUser();
        fwUser.setUsername(user.getUsername());
        fwUser.setEmail(user.getEmail());
        String encoedpassword = passwordEncoder.encode(user.getPassword());
        fwUser.setPassword(encoedpassword);
        FWUser savedUser = repository.save(user);

        FWUserDto fwUserDto = new FWUserDto(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword(),
                savedUser.getEmail());

        return new ResponseEntity<>(fwUserDto, HttpStatus.CREATED);
    }

}
