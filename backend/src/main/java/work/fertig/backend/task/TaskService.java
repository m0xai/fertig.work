package work.fertig.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserRepository;
import work.fertig.backend.user.exceptions.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskValidator taskValidator;
    @Autowired
    private FWUserRepository fwUserRepository;

    public TaskDTOResponse create(TaskDTORequest request) {
        // Takes a request without
        FWUser createdBy = this.getUser(request.getCreatedById());
        Task taskEntity = request.convertToEntity(createdBy);
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

    // TODO: Move this into UserUtil class
    private FWUser getUser(Long userId) {
        // Client sends created by user's id not the whole FWUser entity
        Optional<FWUser> createdBy = fwUserRepository.findById(userId);
        if (createdBy.isEmpty()) {
            throw new UserNotFoundException("An user with ID: " + String.valueOf(userId) + " not found.");
        }
        return createdBy.get();
    }
}

