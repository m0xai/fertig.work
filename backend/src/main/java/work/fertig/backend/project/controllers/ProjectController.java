package work.fertig.backend.project.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.dtos.ProjectDTORequest;
import work.fertig.backend.project.dtos.ProjectDTOResponse;
import work.fertig.backend.project.exceptions.ProjectNotFoundException;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.repositories.ProjectRepository;
import work.fertig.backend.project.services.ProjectService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class ProjectController {

    @Autowired
    public final ProjectRepository repository;

    @Autowired
    private ProjectService projectService;

    public ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/projects/")
    public ResponseEntity<ProjectDTOResponse> create(@Valid @RequestBody ProjectDTORequest request) throws ResponseStatusException {
        try {
            ProjectDTOResponse projectDTOResponse = projectService.create(request);
            return new ResponseEntity<>(projectDTOResponse, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "An unexpected error occurred while creating a project. Error: " + ex.getMessage());
        }
    }

    @GetMapping("/projects/")
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @GetMapping("/projects/{id}/")
    public ResponseEntity<ProjectDTOResponse> getSingleTodo(@PathVariable Long id) throws ProjectNotFoundException {
        try {
            ProjectDTOResponse project = projectService.get(id);
            return new ResponseEntity<>(project, HttpStatus.OK);
        } catch (ProjectNotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project with ID: " + id + " not found.");
        }
    }

    @DeleteMapping("/projects/{id}/")
    public ResponseEntity<Map<String, String>> deleteSingleProject(@PathVariable Long id) {
        if (!projectService.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A project with ID: " + id + " not found.");
        } else {
            projectService.delete(id);
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("msg", "Project with ID: " + id + " deleted successfully");
            return ResponseEntity.ok(responseMap);
        }
    }
}
