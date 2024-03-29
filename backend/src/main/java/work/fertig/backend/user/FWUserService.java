package work.fertig.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import work.fertig.backend.user.dtos.FWUserDTORequest;
import work.fertig.backend.user.dtos.FWUserDTOResponse;
import work.fertig.backend.user.exceptions.UserAlreadyExistsException;
import work.fertig.backend.user.exceptions.UserNotFoundException;

import java.util.List;

@Service
public class FWUserService {
    @Autowired
    private FWUserRepository fwUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public FWUserDTOResponse create(FWUserDTORequest request) {
        if (fwUserRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("email: " + request.getEmail());
        }
        if (fwUserRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("username: " + request.getUsername());
        }

        FWUser fwUser = FWUser.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        FWUser savedUser = fwUserRepository.save(fwUser);

        return FWUserDTOResponse.fromEntity(savedUser);
    }

    public FWUser getUserEntity(Long id) {
        if (!fwUserRepository.existsById(id)) {
            throw new UserNotFoundException("A user with id: " + id + " not found");
        }
        return fwUserRepository.getById(id);
    }

    /**
     * Response to the getting particular user from database
     *
     * @param id Identifier of the user
     * @return a FWUser object in response format
     */
    public FWUserDTOResponse get(Long id) {
        return FWUserDTOResponse.fromEntity(this.getUserEntity(id));
    }

    public FWUser getCurrentUser() {
        FWUserDetails fwUserDetails = (FWUserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return this.getUserEntity(fwUserDetails.getId());
    }

    public List<FWUserDTOResponse> searchByEmail(String input) {
        List<FWUser> foundUsers = fwUserRepository.findTop10ByEmailContaining(input);
        return foundUsers.stream().map(FWUserDTOResponse::fromEntity).toList();
    }

}
