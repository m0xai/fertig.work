package work.fertig.backend.task;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TaskNotFoundException extends ResponseStatusException {
    public TaskNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "A task with the ID: " + id + " not found.");
    }
}
