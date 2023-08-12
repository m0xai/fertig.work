package work.fertig.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.tasklist.TaskListRepository;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;
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
    private TaskListRepository taskListRepository;
    @Autowired
    private FWUserRepository fwUserRepository;

    public TaskDTOResponse create(TaskDTORequest request) {
        // Takes a request without
        FWUser createdBy = this.getUser(request.getCreatedBy());
        if (request.getTaskList() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TaskList(parent) id field cannot be null");
        }
        TaskList taskList = this.getTaskList(request.getTaskList());
        Task taskEntity = request.convertToEntity(createdBy, taskList);
        if (taskEntity == null) {
            throw new NullPointerException("A task, which converted to the entity is NULL");
        }
        Task task = taskRepository.save(taskEntity);
        return TaskDTOResponse.fromTask(task);
    }

    public List<TaskDTOResponse> getAll() {
        List<Task> taskDTOList = taskRepository.findAll();
        return taskDTOList.stream().map(TaskDTOResponse::fromTask).toList();
    }

    public TaskDTOResponse get(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isEmpty()) {
            throw new TaskNotFoundException(id);
        }
        return TaskDTOResponse.fromTask(task.get());
    }

    public TaskDTOResponse update(Long id, TaskDTORequest taskDTORequest) {
        Optional<Task> taskData = taskRepository.findById(id);
        if (taskData.isPresent()) {
            Task task = taskData.get();
            task.setName(taskDTORequest.getName());
            task.setDescription(taskDTORequest.getDescription());
            task.setIsDone(taskDTORequest.getIsDone());
            task.setIsDraft(taskDTORequest.getIsDraft());
            task.setCreatedBy(this.getUser(taskDTORequest.getCreatedBy()));
            task.setTaskList(this.getTaskList(taskDTORequest.getTaskList()));
            return TaskDTOResponse.fromTask(taskRepository.save(task));
        } else {
            throw new TaskNotFoundException(id);
        }
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

    private TaskList getTaskList(Long taskListId) {
        Optional<TaskList> taskList = taskListRepository.findById(taskListId);
        if (taskList.isEmpty()) {
            throw new TaskListNotFoundException(taskListId);
        }
        return taskList.get();
    }
}
