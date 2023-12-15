package work.fertig.backend.task;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping(value = "/tasks/", params = {"projectId"})
    public ResponseEntity<List<TaskDTOResponse>> getTasksByProject(@RequestParam Long projectId) {
        return new ResponseEntity<>(taskService.getLatest10TasksByProject(projectId), HttpStatus.OK);
    }

    @GetMapping(value = "/tasks/", params = {"projectId", "count"})
    public ResponseEntity<Map<String, Integer>> getTasksCountByProject(@RequestParam Long projectId) {
        try {
            return new ResponseEntity<>(taskService.getTasksCountByProject(projectId), HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @GetMapping(value = "/takss/", params = {"projectId", "count"})
    public ResponseEntity<List<TaskDTOResponse>> getLatestNTask(@RequestParam Long projectId,
                                                                @RequestParam Integer count) {
        if (count <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Count param has to be greater than 0.");
        }
        try {
            return new ResponseEntity<>(taskService.getLatestNTasksByProject(projectId, count), HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @GetMapping("/tasks/{id}/")
    public ResponseEntity<TaskDTOResponse> getSingleTask(@PathVariable @NotNull Long id) {
        return new ResponseEntity<>(taskService.get(id), HttpStatus.OK);
    }

    @GetMapping("/tasks/from-list/{id}/")
    public ResponseEntity<List<TaskDTOResponse>> getTasksByList(@Valid @PathVariable Long id) {
        List<TaskDTOResponse> tasks = taskService.getTasksByTaskList(id);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/tasks/")
    public ResponseEntity<TaskDTOResponse> createSingleTask(@Valid @RequestBody TaskDTORequest submittedTask) {
        return new ResponseEntity<>(taskService.create(submittedTask), HttpStatus.CREATED);
    }

    @PutMapping("/tasks/{id}/")
    public ResponseEntity<TaskDTOResponse> updateTask(@PathVariable @NotNull long id,
                                                      @RequestBody TaskDTORequest taskDTORequest) {
        TaskDTOResponse updatedData = null;
        try {
            updatedData = taskService.update(id, taskDTORequest);
        } catch (TaskNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedData, HttpStatus.OK);
    }

    @PatchMapping("/tasks/{id}/")
    public ResponseEntity<TaskDTOResponse> partialUpdateTask(@PathVariable @NotNull long id,
                                                             @Valid @RequestBody TaskDTORequest body) {
        try {
            TaskDTOResponse updatedTask = this.taskService.update(id, body);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (TaskListNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task with ID: " + id + " couldn't updated due " +
                    "to: " + ex);
        }
    }

    @DeleteMapping("/tasks/{id}/")
    public ResponseEntity<String> deleteSingleTask(@PathVariable Long id) {
        try {
            taskService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (TaskNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task with ID: " + id + " not found and hence cannot" +
                    " be deleted.");
        }
    }
}
