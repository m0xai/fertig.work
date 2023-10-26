package work.fertig.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FWUserRepository extends JpaRepository<FWUser, Long> {
    FWUser findByUsername(String username);

    FWUser findByEmail(String mail);

    boolean existsByEmail(String mail);

    boolean existsByUsername(String userName);

    List<FWUser> findTop10ByEmailContaining(String input);
}
