package work.fertig.backend.tasklist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

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

    public List<TaskListDTOResponse> getAll() {
        // TODO: Change this with findAllByProjectId(), after implemention of project
        List<TaskList> taskListList = taskListRepository.findAll();
        return taskListList.stream().map(TaskListDTOResponse::fromTaskList).toList();
    }

    public TaskListDTOResponse get(Long id) {
        Optional<TaskList> oTaskList = taskListRepository.findById(id);
        if (oTaskList.isEmpty()) {
            throw new TaskListNotFoundException(id);
        }
        return TaskListDTOResponse.fromTaskList(oTaskList.get());
    }

}
