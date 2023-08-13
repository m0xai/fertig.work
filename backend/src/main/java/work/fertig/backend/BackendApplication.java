package work.fertig.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.tasklist.TaskListRepository;

@SpringBootApplication
public class BackendApplication {
    @Autowired
    TaskListRepository taskListRepository;
    @Autowired
    private TaskRepository taskRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
