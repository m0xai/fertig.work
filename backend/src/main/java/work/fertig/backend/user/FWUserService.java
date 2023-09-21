package work.fertig.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import work.fertig.backend.user.dtos.FWUserDTORequest;
import work.fertig.backend.user.dtos.FWUserDTOResponse;
import work.fertig.backend.user.exceptions.UserAlreadyExistsException;
import work.fertig.backend.user.exceptions.UserNotFoundException;

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

    public FWUserDTOResponse get(Long id) {
        if (!fwUserRepository.existsById(id)) {
            throw new UserNotFoundException("A user with id: " + id + " not found");
        }
        FWUser oUser = fwUserRepository.getById(id);
        return FWUserDTOResponse.fromEntity(oUser);
    }

    public FWUserDTOResponse getCurrentUser() {
        FWUserDetails fwUserDetails = (FWUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.get(fwUserDetails.getId());
    }
}
