package work.fertig.backend.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import work.fertig.backend.auth.JwtAuthService;
import work.fertig.backend.user.dtos.FWUserDTORequest;
import work.fertig.backend.user.dtos.FWUserDTOResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Validated
public class FWUserController {

    @Autowired
    private final FWUserRepository repository;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtAuthService jwtAuthService;

    @Autowired
    private FWUserService fwUserService;

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
    public ResponseEntity<FWUserDTOResponse> createUser(@Valid @RequestBody FWUserDTORequest request) {
        FWUserDTOResponse fwUserDTOResponse = fwUserService.create(request);
        return new ResponseEntity<>(fwUserDTOResponse, HttpStatus.CREATED);
    }

    // TODO: Move this also in FWUserService
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<Map> authenticateUser(@RequestBody FWUserDTORequest loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        FWUserDetails fwUser = (FWUserDetails) authentication.getPrincipal();

        String token = jwtAuthService.generateToken(loginDto.getUsername());
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", token);
        responseBody.put("msg", "User signed-in successfully!.");
        return new ResponseEntity<>(HttpStatus.OK).ok()
                .header(HttpHeaders.AUTHORIZATION, jwtAuthService.generateToken(fwUser.getUsername()))
                .body(responseBody);
    }

}
