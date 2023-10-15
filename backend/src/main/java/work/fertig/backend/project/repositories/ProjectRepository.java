package work.fertig.backend.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import work.fertig.backend.project.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
