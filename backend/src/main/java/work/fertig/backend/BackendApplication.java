package work.fertig.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import work.fertig.backend.task.TaskRepository;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserRepository;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Autowired
    private TaskRepository taskRepository;

    @Bean
    CommandLineRunner commandLineRunner(FWUserRepository repository, BCryptPasswordEncoder encoder) {
        return args -> {
            repository.deleteAll();
            taskRepository.deleteAll();
            repository.save(new FWUser("derya", encoder.encode("1299"), "kerem@dery.ya"));
        };
    }
}
