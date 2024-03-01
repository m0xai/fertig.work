package work.fertig.backend.tasklist;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.exceptions.ProjectNotFoundException;
import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;
import work.fertig.backend.tasklist.exceptions.TaskListNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@RequestMapping("/api/v1")
public class TaskListController {
    @Autowired
    TaskListServiceImpl taskListServiceImpl;

    @PostMapping("/tasklists/")
    public ResponseEntity<TaskListDTOResponse> create(@Valid @RequestBody TaskListDTORequest request) {
        return new ResponseEntity<>(taskListServiceImpl.create(request), HttpStatus.CREATED);
    }

    @GetMapping(value = "/tasklists/", params = {"projectId"})
    public ResponseEntity<List<TaskListDTOResponse>> getAllByProject(@RequestParam Long projectId) {
        try {
            return new ResponseEntity<>(taskListServiceImpl.getAllByProject(projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @GetMapping("/tasklists/{id}/")
    public ResponseEntity<TaskListDTOResponse> getSingleTaskList(@PathVariable @NotNull Long id) {
        return new ResponseEntity<>(taskListServiceImpl.get(id), HttpStatus.OK);
    }

    @PutMapping("/tasklists/{id}/")
    public ResponseEntity<TaskListDTOResponse> updateTaskList(@PathVariable Long id,
                                                              @RequestParam TaskListDTORequest request) {
        return new ResponseEntity<>(taskListServiceImpl.update(id, request), HttpStatus.OK);
    }

    @DeleteMapping("/tasklists/{id}/")
    public ResponseEntity<Map<String, String>> deleteTaskList(@PathVariable Long id) {
        try {
            taskListServiceImpl.delete(id);
            var response = new HashMap<String, String>();
            response.put("msg", "TaskList with ID: " + id + " deleted " +
                    "succesfully.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (TaskListNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
