package work.fertig.backend.project.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import work.fertig.backend.project.models.ProjectUsers;

public interface ProjectUsersRepository extends JpaRepository<ProjectUsers, Long> {

}
