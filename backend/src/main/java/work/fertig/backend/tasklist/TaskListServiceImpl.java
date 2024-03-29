package work.fertig.backend.tasklist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.exceptions.ProjectNotFoundException;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.services.ProjectService;
import work.fertig.backend.task.TaskNotFoundException;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class TaskListServiceImpl implements TaskListService {
    @Autowired
    TaskListRepository taskListRepository;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    ProjectService projectService;

    public TaskListDTOResponse create(TaskListDTORequest request) {
        try {
            Project project = projectService.getEntity(request.getProject());
            TaskList convertedTaskList = request.convertToEntity(project);
            TaskList taskList = taskListRepository.save(convertedTaskList);
            return TaskListDTOResponse.fromTaskList(taskList);
        } catch (ProjectNotFoundException projectNotFoundException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A Project with ID: " + request.getProject() + " " +
                    "not found.");
        }
    }

    public List<TaskListDTOResponse> getAllByProject(Long projectId) {
        if (projectService.getEntity(projectId) != null) {
            return taskListRepository.getAllByProjectId(projectId)
                    .stream()
                    .map(TaskListDTOResponse::fromTaskList)
                    .toList();
        }
        throw new ProjectNotFoundException("A project with ID: " + projectId + " not found");
    }

    public TaskListDTOResponse get(Long id) {
        try {
            return TaskListDTOResponse.fromTaskList(this.getEntity(id));
        } catch (TaskNotFoundException ex) {
            throw new TaskListNotFoundException(id);
        }
    }

    public TaskList getEntity(Long id) throws TaskNotFoundException {
        Optional<TaskList> oTaskList = taskListRepository.findById(id);
        if (oTaskList.isEmpty()) {
            throw new TaskListNotFoundException(id);
        }
        return oTaskList.get();
    }

    public TaskListDTOResponse update(Long id, TaskListDTORequest request) {
        TaskList taskList = this.getEntity(id);
        // NOTE: At this time, only title of the task list editable
        taskList.setTitle(request.getTitle());
        TaskList saved = taskListRepository.save(taskList);
        return TaskListDTOResponse.fromTaskList(saved);
    }

    public void delete(Long id) throws TaskListNotFoundException {
        var entity = this.getEntity(id);
        this.taskListRepository.delete(entity);
    }
}
