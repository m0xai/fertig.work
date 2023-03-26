package work.fertig.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FWUserDetailsService implements UserDetailsService {

    @Autowired
    private FWUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FWUser user = userRepository.findByUsername(username);
        if (user == null) {
            // TODO: Create custom user not found exception.
            throw new RuntimeException("User not found");
        }

        return user;
    }

}
