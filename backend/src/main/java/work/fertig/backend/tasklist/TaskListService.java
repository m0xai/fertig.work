package work.fertig.backend.tasklist;

import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

import java.util.List;

public interface TaskListService {
    TaskListDTOResponse create(TaskListDTORequest request);

    List<TaskListDTOResponse> getAllByProject(Long projectId);

    TaskListDTOResponse get(Long id);

    TaskList getEntity(Long id) throws TaskListNotFoundException;

    TaskListDTOResponse update(Long id, TaskListDTORequest request);

    void delete(Long id) throws TaskListNotFoundException;
}
