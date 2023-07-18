package work.fertig.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskValidator taskValidator;

    public TaskDTOResponse create(TaskDTORequest request) {
        // Takes a request without
        Task taskEntity = request.convertToEntity();
        if (taskEntity == null) {
            throw new NullPointerException("A task, which converted to the entity is NULL");
        }
        Task task = taskRepository.save(taskEntity);
        return TaskDTOResponse.fromTask(task);
    }

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task get(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "A Task with the id: " + id + " not found."));
    }

    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}
