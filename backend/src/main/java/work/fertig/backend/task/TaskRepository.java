package work.fertig.backend.task;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByTaskListId(Long id);

    List<Task> findLatestNByTaskListProjectIdOrderByCreatedAtDesc(Long id, Pageable pageable);

    Integer countAllByTaskListProjectId(Long id);

    Integer countAllByIsDoneTrueAndTaskListProjectId(Long id);

    Integer countAllByIsDraftTrueAndTaskListProjectId(Long id);

}
