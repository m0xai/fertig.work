package work.fertig.backend.tasklist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.task.Task;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.task.dtos.TaskDTOResponse;
import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {
    @Autowired
    TaskListRepository taskListRepository;
    @Autowired
    TaskRepository taskRepository;

    public TaskListDTOResponse create(TaskListDTORequest request) {
        TaskList convertedTaskList = request.convertToEntity();
        TaskList taskList = taskListRepository.save(convertedTaskList);
        return TaskListDTOResponse.fromTaskList(taskList);
    }

    public TaskListDTOResponse get(Long id) {
        Optional<TaskList> oTaskList = taskListRepository.findById(id);
        if (oTaskList.isEmpty()) {
            throw new TaskListNotFoundException(id);
        }
        return TaskListDTOResponse.fromTaskList(oTaskList.get());
    }

    public List<TaskDTOResponse> getTasksByTaskList(Long id) {
        List<Task> tasks = taskRepository.findAllByTaskListId(id);
        if (tasks.isEmpty()) {
            return new ArrayList<>();
        }
        return tasks.stream().map(TaskDTOResponse::fromTask).toList();
    }

    private List<Task> getTaskItems(List<Long> ids) {
        if (ids.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No list of tasks were given.");
        }
        return taskRepository.findAllById(ids);
    }
}
