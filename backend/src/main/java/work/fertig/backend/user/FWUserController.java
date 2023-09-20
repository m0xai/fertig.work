package work.fertig.backend.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
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
    public ResponseEntity<Map<String, String>> user() {
        Map<String, String> currentUser = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FWUserDetails userDetails = (FWUserDetails) authentication.getPrincipal();
        currentUser.put("id", userDetails.getId().toString());
        currentUser.put("username", userDetails.getUsername());
        currentUser.put("email", userDetails.getEmail());
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    @GetMapping("/users")
    public List<FWUser> getAllUsers() {
        return repository.findAll();
    }

    @GetMapping("/users/{id}/")
    public ResponseEntity<FWUserDTOResponse> getSingleUser(@PathVariable @NotNull Long id) {
        FWUserDTOResponse user = this.fwUserService.get(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<FWUserDTOResponse> createUser(@Valid @RequestBody FWUserDTORequest request) {
        // TODO: return error, when email/username is invalid/used with modifying FWUserDTORequest
        FWUserDTOResponse fwUserDTOResponse = fwUserService.create(request);
        return new ResponseEntity<>(fwUserDTOResponse, HttpStatus.CREATED);
    }

    // TODO: Move this also in FWUserService
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<Map> authenticateUser(@RequestBody FWUserDTORequest loginDto) {
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDto.getUsername(), loginDto.getPassword()));
        } catch (InternalAuthenticationServiceException ex) {
            // TODO: Cover the situation, when password is false
            Map<String, String> notFoundBody = new HashMap<>();
            notFoundBody.put("msg", "Username or password wrong");
            return ResponseEntity.status(401).body(notFoundBody);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);

        FWUserDetails fwUser = (FWUserDetails) authentication.getPrincipal();

        String token = jwtAuthService.generateToken(loginDto.getUsername());
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("token", token);
        responseBody.put("msg", "User signed-in successfully!.");
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtAuthService.generateToken(fwUser.getUsername())).body(responseBody);
    }

}
