package work.fertig.backend.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.dtos.ProjectDTOResponse;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.repositories.ProjectRepository;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
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
    public ResponseEntity<ProjectDTOResponse> getSingleTodo(@PathVariable Long projectId) {
        Project project = repository.findById(projectId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Project with the id: " + projectId + " not found in our database."));
        return new ResponseEntity<>(ProjectDTOResponse.fromProject(project), HttpStatus.OK);
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
