package work.fertig.backend.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class TodoController {

    @Autowired
    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/todos/")
    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    @GetMapping("/todos/{id}/")
    public Todo getSingleTodo(@PathVariable Long id) {
        Todo item = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "A todo with the id: " + id + " not found."));
        return item;
    }

    @PostMapping("/todos/")
    public Todo addSingleTodo(@RequestBody Todo submittedTodo) {
        return repository.save(submittedTodo);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteSingleTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
