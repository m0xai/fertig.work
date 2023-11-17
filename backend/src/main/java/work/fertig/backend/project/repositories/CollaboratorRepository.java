package work.fertig.backend.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import work.fertig.backend.project.models.Collaborator;

import java.util.List;

@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
    List<Collaborator> findAllByProjectId(Long projectId);
}