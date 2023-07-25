package work.fertig.backend.tasklist.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TaskListNotFoundException extends ResponseStatusException {
    public TaskListNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "A task list with ID: " + id + " not found.");
    }
}
