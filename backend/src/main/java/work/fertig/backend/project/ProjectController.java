package work.fertig.backend.project;

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
public class ProjectController {

    @Autowired
    public final ProjectRepository repository;

    public ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/projects/")
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @GetMapping("/projects/{projectId}/")
    public Project getSingleTodo(@PathVariable Long projectId) {
        Project project = repository.findById(projectId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Project with the id: " + projectId + " not found in our database."));
        return project;
    }

    @PostMapping("/projects/")
    public Project addSingleTodo(@RequestBody Project projectToSave) {
        return repository.save(projectToSave);
    }

    @DeleteMapping("/projects/{projectId}")
    public void deleteSingleProject(@PathVariable Long projectId) {
        repository.deleteById(projectId);
    }

}
