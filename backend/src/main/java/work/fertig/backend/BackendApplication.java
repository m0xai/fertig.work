package work.fertig.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import work.fertig.backend.task.Task;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.tasklist.TaskListRepository;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserRepository;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    TaskListRepository taskListRepository;

    @Bean
    CommandLineRunner commandLineRunner(FWUserRepository repository, BCryptPasswordEncoder encoder) {
        return args -> {
            taskRepository.deleteAll();
            repository.deleteAll();
            FWUser user = repository.save(FWUser.builder()
                    .username("derya")
                    .password(encoder.encode("1299"))
                    .email("kerem@dery.ya")
                    .build());
            TaskList taskList = taskListRepository.save(TaskList.builder().title("Task List 1").build());
            taskRepository.save(Task.builder().name("Task 1").description("Just some description").taskList(taskList).createdBy(user).build());
        };
    }
}
