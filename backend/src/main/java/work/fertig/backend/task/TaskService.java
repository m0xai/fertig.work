package work.fertig.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.services.ProjectService;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.tasklist.TaskListRepository;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserService;

import java.util.*;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskListRepository taskListRepository;
    @Autowired
    private FWUserService fwUserService;
    @Autowired
    private ProjectService projectService;

    public TaskDTOResponse create(TaskDTORequest request) {
        // Takes a request without
        if (request.getTaskList() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "TaskList(parent) id field cannot be null");
        }
        TaskList taskList = this.getTaskList(request.getTaskList());
        FWUser fwUser = this.fwUserService.getCurrentUser();
        Task taskEntity = request.convertToEntity(fwUser, taskList);
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

    public Map<String, Integer> getTaskStatsByProject(Long projectId) {
        if (projectService.getEntity(projectId) == null) {
            throw new RuntimeException("There isn't any project found with ID: " + projectId + ".");
        }
        Map<String, Integer> countDetails = new HashMap<>();
        countDetails.put("totalCount", taskRepository.countAllByTaskListProjectId(projectId));
        countDetails.put("doneCount", taskRepository.countAllByIsDoneTrueAndTaskListProjectId(projectId));
        countDetails.put("draftCount", taskRepository.countAllByIsDraftTrueAndTaskListProjectId(projectId));
        return countDetails;
    }

    public List<TaskDTOResponse> getLatestNTasksByProject(Long projectId, Integer n) throws RuntimeException {
        if (projectService.getEntity(projectId) == null) {
            throw new RuntimeException("There isn't any project found with ID: " + projectId + ".");
        }
        Pageable pageable = PageRequest.of(0, n);
        List<Task> latestTasks = taskRepository.findLatestNByTaskListProjectIdOrderByCreatedAtDesc(projectId, pageable);
        return latestTasks.stream().map(TaskDTOResponse::fromTask).toList();
    }

    public TaskDTOResponse get(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isEmpty()) {
            throw new TaskNotFoundException(id);
        }
        return TaskDTOResponse.fromTask(task.get());
    }

    public List<TaskDTOResponse> getTasksByTaskList(Long id) {
        List<Task> tasks = taskRepository.findAllByTaskListId(id);
        if (tasks.isEmpty()) {
            return new ArrayList<>();
        }
        return tasks.stream().map(TaskDTOResponse::fromTask).toList();
    }

    public TaskDTOResponse update(Long id, TaskDTORequest taskDTORequest) {
        Optional<Task> taskData = taskRepository.findById(id);
        if (taskData.isPresent()) {
            Task task = taskData.get();
            task.setName(taskDTORequest.getName());
            task.setDescription(taskDTORequest.getDescription());
            task.setIsDone(taskDTORequest.getIsDone());
            task.setIsDraft(taskDTORequest.getIsDraft());
            // NOTE: This cannot change, since we have to track, who created.
            task.setCreatedBy(fwUserService.getCurrentUser());
            task.setPriority(taskDTORequest.getPriority());
            task.setStatus(taskDTORequest.getStatus());
            task.setTaskList(this.getTaskList(taskDTORequest.getTaskList()));
            return TaskDTOResponse.fromTask(taskRepository.save(task));
        } else {
            throw new TaskNotFoundException(id);
        }
    }

    public void delete(Long id) throws TaskNotFoundException {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            throw new TaskNotFoundException(id);
        }
    }

    private TaskList getTaskList(Long taskListId) {
        Optional<TaskList> taskList = taskListRepository.findById(taskListId);
        if (taskList.isEmpty()) {
            throw new TaskListNotFoundException(taskListId);
        }
        return taskList.get();
    }
}
