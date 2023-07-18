package work.fertig.backend.task;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
public class TaskController {

    @Autowired
    private final TaskService taskService;

    @GetMapping("/Tasks/")
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @GetMapping("/Tasks/{id}/")
    public Task getSingleTask(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "A Task with the id: " + id + " not found."));
    }

    @PostMapping("/Tasks/")
    public Task addSingleTask(@Valid @RequestBody Task submittedTask) {
        return taskService.create(submittedTask);
    }

    @DeleteMapping("/Tasks/{id}")
    public void deleteSingleTask(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
