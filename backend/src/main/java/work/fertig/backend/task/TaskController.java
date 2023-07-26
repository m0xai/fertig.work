package work.fertig.backend.task;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import work.fertig.backend.task.dtos.TaskDTORequest;
import work.fertig.backend.task.dtos.TaskDTOResponse;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks/")
    public ResponseEntity<List<TaskDTOResponse>> getAllTasks() {
        return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/tasks/{id}/")
    public ResponseEntity<TaskDTOResponse> getSingleTask(@PathVariable @NotNull Long id) {
        return new ResponseEntity<>(taskService.get(id), HttpStatus.OK);
    }

    @PostMapping("/tasks/")
    public ResponseEntity<TaskDTOResponse> createSingleTask(@Valid @RequestBody TaskDTORequest submittedTask) {
        return new ResponseEntity<>(taskService.create(submittedTask), HttpStatus.CREATED);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<String> deleteSingleTask(@PathVariable Long id) {
        taskService.delete(id);
        return new ResponseEntity<>("Task with ID: " + id + " deleted successfully.", HttpStatus.OK);
    }
}
