package work.fertig.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import work.fertig.backend.user.exceptions.UserNotFoundException;

@Service
public class FWUserDetailsService implements UserDetailsService {

    @Autowired
    private final FWUserRepository userRepository;

    public FWUserDetailsService(FWUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {
        FWUser fwUser = userRepository.findByUsername(username);
        if (fwUser == null) {
            // TODO: Create custom user not found exception.
            throw new UserNotFoundException("User with the username: " + username + " not found");
        }

        return new FWUserDetails(fwUser);
    }

}
