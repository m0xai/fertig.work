package work.fertig.backend.task;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import work.fertig.backend.task.dtos.TaskDTO;
import work.fertig.backend.task.dtos.TaskDTORequest;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks/")
    public List<Task> getAllTasks() {
        return taskService.getAll();
    }

    @GetMapping("/tasks/{id}/")
    public Task getSingleTask(@PathVariable @NotNull Long id) {
        return taskService.get(id);
    }

    @PostMapping("/tasks/")
    public TaskDTO createSingleTask(@Valid @RequestBody TaskDTORequest submittedTask) {
        return taskService.create(submittedTask);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteSingleTask(@PathVariable Long id) {
        taskService.delete(id);
    }
}
