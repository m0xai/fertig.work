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

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1")
public class TaskListController {
    @Autowired
    TaskListService taskListService;

    @PostMapping("/tasklists/")
    public ResponseEntity<TaskListDTOResponse> create(@Valid @RequestBody TaskListDTORequest request) {
        return new ResponseEntity<>(taskListService.create(request), HttpStatus.CREATED);
    }

    @GetMapping(value = "/tasklists/", params = {"projectId"})
    public ResponseEntity<List<TaskListDTOResponse>> getAllByProject(@RequestParam Long projectId) {
        try {
            return new ResponseEntity<>(taskListService.getAllByProject(projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @GetMapping("/tasklists/{id}/")
    public ResponseEntity<TaskListDTOResponse> getSingleTaskList(@PathVariable @NotNull Long id) {
        return new ResponseEntity<>(taskListService.get(id), HttpStatus.OK);
    }
}
