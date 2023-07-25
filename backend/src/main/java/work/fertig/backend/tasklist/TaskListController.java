package work.fertig.backend.tasklist;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import work.fertig.backend.tasklist.dtos.TaskListDTORequest;
import work.fertig.backend.tasklist.dtos.TaskListDTOResponse;

@RestController
@Validated
@RequestMapping("/api/v1")
public class TaskListController {
    @Autowired
    TaskListService taskListService;

    @PostMapping("/tasklists")
    public ResponseEntity<TaskListDTOResponse> create(@Valid @RequestBody TaskListDTORequest request) {
        return new ResponseEntity<>(taskListService.create(request), HttpStatus.CREATED);
    }

    @GetMapping("/tasklists/{id}/")
    public ResponseEntity<TaskListDTOResponse> getSingleTaskList(@PathVariable @NotNull Long id) {
        return new ResponseEntity<>(taskListService.get(id), HttpStatus.OK);
    }
}
